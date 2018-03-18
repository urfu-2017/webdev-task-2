# Задача «Артемий слишком занят»

Перед выполнением задания внимательно прочитайте:

- [О всех этапах проверки задания](https://github.com/urfu-2017/guides/blob/master/workflow/overall.md)
- [Как отправить пулл](https://github.com/urfu-2017/guides/blob/master/workflow/pull.md)
- [Как пройти тесты](https://github.com/urfu-2017/guides/blob/master/workflow/test.md)
- Правила оформления [javascript](https://github.com/urfu-2017/guides/blob/master/codestyle/js.md), [HTML](https://github.com/urfu-2017/guides/blob/master/codestyle/html.md) и [CSS](https://github.com/urfu-2017/guides/blob/master/codestyle/css.md) кода

## Основное задание
Билли отправляется в путешествие и ему хочется составить список мест,
которые он желает посетить. Но память постоянно подводит Билли,
и он забывает, в каких местах ему уже довелось побывать. Чтобы путешествие Билли было
увлекательным, и он посетил запланированные достопримечательности, ему нужен сервис для сохранения и просмотра отметок о посещенных местах.

Билли прочитал хорошую книгу по фронтенду и сделает его сам,
а своего друга, опытного путешественника Артемия, попросил реализовать REST-интерфейс (API), используя Express.
Но Артемий укатил в очередную экспедицию, и просит помощи у вас.

### Билли просил
- Возможность добавления нового места (страны, города, достопримечательности) 
    - пример использования: 
    POST http://localhost:8080/places
    { 
        "name": "Это проверка",
        "description": "Это проверка"
    }
    - Место состоит из описания и отметки о посещении
    - Место создается непосещённым
- Возможность получения списка мест
    - Можно сортировать по дате создания GET http://localhost:8080/places?sort=asc.createDate
    - Можно сортировать по алфавиту GET http://localhost:8080/places?sort=desc.name
    - Можно выводить список мест постранично GET http://localhost:8080/places/pages/1?count=1
- Возможность поиска места по его описанию GET http://localhost:8080/places/search?description=Это проверка
- Возможность редактирования описания конкретного места
    PATCH { "description": "Это проверка1" }  http://localhost:8080/places/0 
- Возможность отметить место посещённым или непосещённым
    POST http://localhost:8080/places/0?visit=true
- Возможность удаления места
    DELETE http://localhost:8080/places/0
- Возможность менять порядок мест в списке
    PUT http://localhost:8080/places/1?id=3
- Возможность очистки всего списка мест
    DELETE http://localhost:8080/places

![artemii](https://user-images.githubusercontent.com/8963033/37154087-b5f1ed76-2300-11e8-81b7-0a8700bc5f57.png)
