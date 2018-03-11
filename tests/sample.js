'use strict'

import { getApp } from '../app'
import { expect } from 'chai'
import { TestApp } from './test-app'

describe('spots', () => {
    const sut = new TestApp(getApp())

    it('returns id on creation', async () => {
        const { id } = (await sut.addSpot('desc')).body

        expect(id).to.be.a('string')
    })
})
