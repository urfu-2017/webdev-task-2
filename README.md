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
- Возможность добавления нового места (страны, города, достопримечательности) `POST /api/sights`
    - Место состоит из описания и отметки о посещении
    - Место создается непосещённым
- Возможность получения списка мест `GET /api/sights`
    - Можно сортировать по дате создания `GET /api/sights?orderBy=date`
    - Можно сортировать по алфавиту `GET /api/sights?orderBy=description`
    - Можно выводить список мест постранично `GET /api/sights/page/3?sightsPerPage=5`
- Возможность поиска места по его описанию `GET /api/sights/%description%`
- Возможность редактирования описания конкретного места `PATCH /api/sights/%id%`
- Возможность отметить место посещённым или непосещённым `PUT|DELETE /api/sights/%id%/visited`
- Возможность удаления места `DELETE /api/sights/%id%`
- Возможность менять порядок мест в списке `PUT /api/sights/%oldIndex%/change-index/%newIndex%`
- Возможность очистки всего списка мест `DELETE /api/sights`

## Формат данных POST и PATCH запросов
JSON с единственным единственным полем `description`:

    {
        "description": "Eiffel Tower"
    }
    
## Формат данных ответа
JSON вида

    {
        "description": "Eiffel Tower",
        "id": 10,
        "visited": false,
        "creationDate": "2016-05-15T04:32:15.823Z"
    }

Или список таких объектов.

![artemii](https://user-images.githubusercontent.com/8963033/37154087-b5f1ed76-2300-11e8-81b7-0a8700bc5f57.png)
