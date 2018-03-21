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
- Возможность добавления нового места (страны, города, достопримечательности) (POST /places/)
    - Место состоит из описания и отметки о посещении
    - Место создается непосещённым
- Возможность получения списка мест (GET /places)
    - Можно сортировать по дате создания (GET /places/?dateSort={asc|desc})
    - Можно сортировать по алфавиту (GET /places/?dateSort={asc|desc})
    - Можно выводить список мест постранично (GET /places/page/{number}?placesCount={number})
- Возможность поиска места по его описанию (GET /places/?description=text)
- Возможность редактирования описания конкретного места (PATCH /places)
- Возможность отметить место посещённым или непосещённым (PATCH /places)
- Возможность удаления места (DELETE /places/id)
- Возможность менять порядок мест в списке (PATCH /places/shuffle/?firstId={number}&secondId={number})
- Возможность очистки всего списка мест (DELETE /places)

### Деплой
https://webdev-task-2-idopbpwslm.now.sh/places

![artemii](https://user-images.githubusercontent.com/8963033/37154087-b5f1ed76-2300-11e8-81b7-0a8700bc5f57.png)
