'use strict'

import { expect } from 'chai'
import { getApp } from '../app'
import { TestApp } from './test-app'


const handleError = promise => promise.catch(err => err)

let sut
beforeEach(() => sut = new TestApp(getApp()))

suite('/spots')

test('returns id on creation', async () => {
    const res = await sut.addSpot('desc')
    const { id } = res.body

    expect(res).to.have.status(200)
    expect(id).to.be.a('string')
})

test('adds and displays two spots', async () => {
    const noSpots = await sut.getSpots()
    await sut.addSpot('a1')
    await sut.addSpot('b2')
    const spots = await sut.getSpots()
    const [a, b] = [
        { description: 'a1', visited: false },
        { description: 'b2', visited: false },
    ]

    expect(noSpots).to.have.status(200)
    expect(noSpots.body).to.be.empty
    expect(spots).to.have.status(200)
    expect(spots.body).to.be.deep.equal([a, b])
})

test('can shuffle and sort', async () => {
    await sut.addSpot('dspot1')
    await sut.addSpot('cspot2')
    await sut.addSpot('bspot3')
    await sut.addSpot('aspot4')
    await sut.shuffleSpots()
    const spotsShuffled = await sut.getSpots()
    const spotsByDate = await sut.getSpots('date')
    const spotsByLex = await sut.getSpots('lex')
    const [a, b, c, d] = [
        { description: 'dspot1', visited: false },
        { description: 'cspot2', visited: false },
        { description: 'bspot3', visited: false },
        { description: 'aspot4', visited: false },
    ]

    expect(spotsShuffled.body).not.to.be.deep.equal([a, b, c, d])
    expect(spotsByLex.body).to.be.deep.equal([d, c, b, a])
    expect(spotsByDate.body).to.be.deep.equal([a, b, c, d])
})

test('deletes exisiting spot', async () => {
    const { id } = (await sut.addSpot('delspot')).body
    await sut.addSpot('delspot')
    const res = await sut.deleteSpot(id)
    const spots = await sut.getSpots()

    expect(res).to.have.status(200)
    expect(spots.body).to.be.deep.equal([{ description: 'delspot', visited: false }])
})

test("can't delete non-exisiting spot", async () => {
    await sut.addSpot('delspot')
    await sut.addSpot('delspot')
    const res = await handleError(sut.deleteSpot('BAD_ID'))
    const spots = await sut.getSpots()

    expect(res).to.have.status(400)
    expect(spots.body).to.be.deep.equal([
        { description: 'delspot', visited: false },
        { description: 'delspot', visited: false }
    ])
})

test('deletes all', async () => {
    await sut.addSpot('1')
    await sut.addSpot('2')
    const res = await sut.deleteAllSpots()
    const spots = await sut.getSpots()

    expect(res).to.have.status(200)
    expect(spots.body).to.be.empty
})

test('changes spot', async () => {
    const { id } = (await sut.addSpot('new')).body
    const res = await sut.editSpot(id, true, 'newDesc')
    const spots = await sut.getSpots()

    expect(res).to.have.status(200)
    expect(res.body).to.be.deep.equal({ description: 'newDesc', visited: true })
    expect(spots.body).to.be.deep.equal([{ description: 'newDesc', visited: true }])
})

test("can't change non-existing spot", async () => {
    const res = await handleError(sut.editSpot('bad_1D', true, 'newDesc'))
    const spots = await sut.getSpots()

    expect(res).to.have.status(400)
    expect(spots.body).to.be.empty
})

test('can work with pages', async () => {
    await sut.addSpot('fst')
    await sut.addSpot('scnd')
    const page1 = await sut.getSpots('date', 0, 1)
    const page2 = await sut.getSpots('date', 1, 1)

    expect(page1.body).to.be.deep.equal([{ description: 'fst', visited: false }])
    expect(page2.body).to.be.deep.equal([{ description: 'scnd', visited: false }])
})

test('can search by substring', async () => {
    await sut.addSpot('alala xaxax 1')
    await sut.addSpot('ala xanax 2')
    const [ s1, s2 ] = [
        { description:'alala xaxax 1', visited: false },
        { description:'ala xanax 2', visited: false }
    ]
    const res = await Promise.all([
        await sut.searchSpot('ala'),
        await sut.searchSpot(''),
        await sut.searchSpot('xana'),
        await sut.searchSpot('3')
    ])
    const [ a, b, c, d ] = res

    res.forEach(x => expect(x).to.have.status(200))
    expect(a.body).to.have.deep.members([s1, s2])
    expect(b.body).to.have.deep.members([s1, s2])
    expect(c.body).to.be.deep.equal([s2])
    expect(d.body).to.be.empty
})

test('can swap two spots', async () => {
    const idA = (await sut.addSpot('dspot1')).body.id
    await sut.addSpot('cspot2')
    const idB = (await sut.addSpot('bspot3')).body.id
    await sut.addSpot('aspot4')
    await sut.swap(idA, idB)
    const spots = await sut.getSpots()
    const spotsByDate = await sut.getSpots('date')
    const spotsByLex = await sut.getSpots('lex')
    const [a, b, c, d] = [
        { description: 'dspot1', visited: false },
        { description: 'cspot2', visited: false },
        { description: 'bspot3', visited: false },
        { description: 'aspot4', visited: false },
    ]

    expect(spots.body).to.be.deep.equal([c, b, a, d])
    expect(spotsByLex.body).to.be.deep.equal([d, c, b, a])
    expect(spotsByDate.body).to.be.deep.equal([a, b, c, d])
})
