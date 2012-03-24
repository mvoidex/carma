{
    "name": "case",
    "title": "Кейс",
    "canCreate": true,
    "canRead": true,
    "canUpdate": true,
    "canDelete": true,
    "fields": [
        {
            "name": "comment",
            "type": "dictionary",
            "canWrite": true,
            "canRead": true,
            "meta": {
                "dictionaryName": "Wazzup",
                "label": "Что случилось"
            }
        },
        {
            "name": "diagnosis1",
            "canWrite": true,
            "canRead": true,
            "type": "dictionary",
            "meta": {
                "dictionaryName": "Diagnosis1",
                "label": "Диагностика"
            }
        },            
        {
            "name": "diagnosis2",
            "canWrite": true,
            "canRead": true
        },
        {
            "name": "diagnosis3",
            "canWrite": true,
            "canRead": true
        },
        {
            "name": "diagnosis4",
            "canWrite": true,
            "canRead": true
        },
        {
            "name": "callDate",
            "canWrite": true,
            "canRead": true,
            "index": true,
            "indexCollate": true,
            "meta": {
                "label": "Дата звонка",
                "readonly": true
            }
        },
        {
            "name": "callTime",
            "canWrite": true,
            "canRead": true,
            "meta": {
                "label": "Время звонка",
                "readonly": true
            }
        },
        {
            "name": "callTaker",
            "canWrite": false,
            "canRead": true,
            "meta": {
                "label": "Сотрудник РАМК",
                "required": true,
                "readonly": true
            }
        },
        {
            "name": "program",
            "canWrite": true,
            "canRead": true,
            "index": true,
            "type": "dictionary",
            "meta": {
                "dictionaryName": "Programs",
                "label": "Программа",
                "required": true
            }
        },
        {
            "name": "address",
            "canWrite": true,
            "canRead": true,
            "groupName": "address",
            "meta": {
                "label": "Адрес кейса"
            }
        },
        {
            "name": "caller",
            "canWrite": true,
            "canRead": true,
            "groupName": "contact",
            "meta": {
                "label": "Клиент"
            }
        },
        {
            "name": "status",
            "canWrite": true,
            "canRead": true,
            "type": "dictionary",
            "meta": {
                "required": true,
                "dictionaryName": "CaseStatuses",
                "label": "Статус звонка"
            }
        },
        {
            "name": "car",
            "groupName": "car"
        },
        {
            "name": "services",
            "type": "reference",
            "canWrite": true,
            "canRead": true,
            "meta": {
                "label": "Услуги"
            }
        }
    ]
}
