const testsData = {
    "5": {
        title: { uz: "5-6 sinf O'quvchilarining qiziqishlarini aniqlash", ru: "5-6 класс Выявление интересов учащихся" },
        desc: { uz: "Quyidagi savollarga javob bering. Ba'zi savollarda bir nechta javob belgilash mumkin.", ru: "Ответьте на следующие вопросы. В некоторых вопросах можно выбрать несколько вариантов." },
        type: "survey",
        questions: [
            {
                id: 5,
                type: "checkbox",
                uz: "5. Quyidagi faoliyatlardan qaysi biri sizga eng qiziq?",
                ru: "5. Какая из следующих сфер деятельности вам наиболее интересна?",
                options: [
                    { uz: "Kompyuter / IT", ru: "Компьютеры / IT" },
                    { uz: "San'at va ijod", ru: "Искусство и творчество" },
                    { uz: "Huquq va davlat xizmati", ru: "Право и госслужба" },
                    { uz: "Media / jurnalistika", ru: "Медиа / журналистика" },
                    { uz: "Tibbiyot", ru: "Медицина" },
                    { uz: "Sport", ru: "Спорт" },
                    { uz: "Biznes va tadbirkorlik", ru: "Бизнес и предпринимательство" },
                    { uz: "Texnika va muhandislik", ru: "Техника и инженерия" },
                    { uz: "Ta'lim va pedagogika", ru: "Образование и педагогика" },
                    { uz: "Tabiat va ekologiya", ru: "Природа и экология" }
                ],
                hasOther: true
            },
            {
                id: 6,
                type: "text_multiple",
                count: 3,
                uz: "6. Kelajakda qaysi kasb yoki kasblarga qiziqasiz?",
                ru: "6. Какой профессией или профессиями вы интересуетесь в будущем?"
            },
            {
                id: 7,
                type: "checkbox",
                uz: "7. Bu kasbga qiziqishingizga nima sabab bo'lgan?",
                ru: "7. Что стало причиной вашего интереса к этой профессии?",
                options: [
                    { uz: "Bu kasb menga yoqadi", ru: "Мне нравится эта профессия" },
                    { uz: "Bolaligimdan xohlayman", ru: "Хочу с детства" },
                    { uz: "Odamlarga yordam berish", ru: "Помогать людям" },
                    { uz: "Tanishim shu kasbda ishlaydi", ru: "Знакомый работает в этой сфере" },
                    { uz: "Daromadi yaxshi deb o'ylayman", ru: "Думаю, что хороший доход" },
                    { uz: "Hali aniq bilmayman", ru: "Пока точно не знаю" }
                ],
                hasOther: true
            },
            {
                id: 8,
                type: "checkbox",
                uz: "8. Siz ko'proq qanday ishni bajarishni xohlaysiz?",
                ru: "8. Какую работу вы больше хотите выполнять?",
                options: [
                    { uz: "Odamlar bilan ishlash", ru: "Работа с людьми" },
                    { uz: "Texnika va qurilmalar", ru: "Техника и устройства" },
                    { uz: "Bolalar bilan ishlash", ru: "Работа с детей" },
                    { uz: "Mustaqil ishlash", ru: "Самостоятельная работа" },
                    { uz: "Kompyuter bilan ishlash", ru: "Работа с компьютером" },
                    { uz: "Hayvonlar va tabiat", ru: "Животные и природа" },
                    { uz: "Ijodiy ishlar", ru: "Творческая работа" },
                    { uz: "Jamoa bilan ishlash", ru: "Работа в команде" }
                ]
            },
            {
                id: 9,
                type: "checkbox",
                uz: "9. Qaysi to'garak yoki klub sizni ko'proq qiziqtiradi?",
                ru: "9. Какой кружок или клуб вас больше интересует?",
                options: [
                    { uz: "IT / robototexnika", ru: "IT / робототехника" },
                    { uz: "Sport", ru: "Спорт" },
                    { uz: "Rasm / dizayn", ru: "Рисование / дизайн" },
                    { uz: "Xorijiy tillar", ru: "Иностранные языки" },
                    { uz: "Musiqa", ru: "Музыка" },
                    { uz: "Kitobxonlik", ru: "Чтение книг" },
                    { uz: "Debat", ru: "Дебаты" },
                    { uz: "Teatr", ru: "Театр" },
                    { uz: "Ekologiya", ru: "Экология" }
                ],
                hasOther: true
            },
            {
                id: 10,
                type: "text",
                uz: "10. Maktabda yangi to'garak ochilsa, qaysi yo'nalishda bo'lishini xohlardingiz?",
                ru: "10. Если бы в школе открылся новый кружок, в каком направлении вы бы хотели его видеть?"
            },
            {
                id: 11,
                type: "checkbox",
                uz: "11. O'zingizni kelajakda qanday inson sifatida tasavvur qilasiz?",
                ru: "11. Каким человеком вы представляете себя в будущем?",
                options: [
                    { uz: "Yaxshi mutaxassis", ru: "Хороший специалист" },
                    { uz: "Ijodkor", ru: "Творец/созидатель" },
                    { uz: "O'qituvchi", ru: "Учитель" },
                    { uz: "Tadbirkor", ru: "Предприниматель" },
                    { uz: "Sportchi", ru: "Спортсмен" },
                    { uz: "Olim", ru: "Ученый" },
                    { uz: "Rahbar", ru: "Руководитель" }
                ],
                hasOther: true
            },
            {
                id: 12,
                type: "checkbox",
                uz: "12. Sizga kasb tanlashda kimning maslahati ko'proq ta'sir qiladi?",
                ru: "12. Чей совет больше всего влияет на ваш выбор профессии?",
                options: [
                    { uz: "Ota-onam", ru: "Родители" },
                    { uz: "Maktab maslahatchisi", ru: "Школьный консультант" },
                    { uz: "O'qituvchim", ru: "Учитель" },
                    { uz: "Psixolog", ru: "Психолог" },
                    { uz: "Sinfdoshlarim / do'stlarim", ru: "Одноклассники / друзья" },
                    { uz: "O'zim mustaqil tanlayman", ru: "Выбираю сам(а)" }
                ],
                hasOther: true
            },
            {
                id: 13,
                type: "radio_with_text",
                uz: "13. Kelajakdagi kasbingiz haqida ma'lumot olishni xohlaysizmi?",
                ru: "13. Хотели бы вы получить информацию о своей будущей профессии?",
                options: [
                    { val: "Ha", uz: "Ha", ru: "Да" },
                    { val: "Yo'q", uz: "Yo'q", ru: "Нет" },
                    { val: "Hali", uz: "Hali o'ylab ko'rmaganman", ru: "Пока не думал(а)" }
                ],
                textPrompt: { uz: "Agar 'Ha' bo'lsa, qaysi kasb haqida?", ru: "Если 'Да', о какой профессии?" },
                triggerValue: "Ha"
            },
            {
                id: 14,
                type: "textarea",
                uz: "14. Siz maktab hayotini yaxshilash uchun qanday yangi g'oya yoki tashabbus taklif qilgan bo'lardingiz?",
                ru: "14. Какую новую идею или инициативу вы бы предложили для улучшения школьной жизни?"
            },
            {
                id: 15,
                type: "textarea",
                uz: "15. O'zingiz haqingizda biz bilishimiz kerak deb hisoblagan boshqa qiziqishingiz, qobiliyatingiz yoki orzuingiz bormi?",
                ru: "15. Есть ли у вас другие интересы, способности или мечты, о которых, по вашему мнению, мы должны знать?"
            }
        ]
    },
    "7": {
        title: { uz: "7-sinf Tashkilotchilik qobiliyatini aniqlash", ru: "7 класс Определение организаторских способностей" },
        desc: { uz: "Savollarni diqqat bilan o‘qing, uzoq o‘ylamasdan o‘zingizga mos bo‘lgan javobni tanlang va belgilang.", ru: "Внимательно прочитайте вопросы, выберите тот, который подходит вам больше всего, и отметьте его." },
        type: "single",
        questions: [
            { id: 1, uz: "O‘rtoqlaringiz har doim ham sizning fikringizga qo‘shilishadimi?", ru: "Ваши друзья с вами всегда согласны?" },
            { id: 2, uz: "Turli vaziyatlardan chiqish yo‘llarini topa olasizmi?", ru: "Можете ли вы найти выход из разных ситуаций?" },
            { id: 3, uz: "Sizga jamoatchilik ishlari bilan shug‘ullanish yoqadimi?", ru: "Вам нравится общественная работа?" },
            { id: 4, uz: "Agar maqsadlaringizni amalga oshirish yo‘lida qiyinchilikka duch kelsangiz ulardan voz kechasizmi?", ru: "Если у вас возникнут трудности с достижением ваших целей, откажетесь ли вы от них?", invert: true },
            { id: 5, uz: "Siz har xil o‘yin va xursandchilik tadbirlarini o‘ylab topishni va tashkil etishni yoqtirasizmi?", ru: "Вам нравится организовывать различные игры и веселые мероприятия?" },
            { id: 6, uz: "Siz ko‘p hollarda bugun bajarilishi kerak bo‘lgan ishlarni boshqa kunga ko‘chirasizmi:", ru: "Часто ли вы переносите работу, которую необходимо выполнить сегодня:", invert: true },
            { id: 7, uz: "Siz o‘rtoqlaringiz uchun turli qiziqarli tadbirlarni tashkil eta olasizmi:", ru: "Можете ли вы организовать различные веселые мероприятия для своих друзей:" },
            { id: 8, uz: "Sizni o‘rtoqlaringiz bilan kelishmay qolishingiz ularning bergan va’dalarini bajarmasligi oqibatida bo‘lmasligi rostmi:", ru: "Правда ли, что ваше несогласие с друзьями не связано с тем, что они не выполняют своих обещаний:" },
            { id: 9, uz: "Siz ko‘p hollarda topshiriqlarni bajarishda tashabbus ko‘rsatasizmi:", ru: "Вы часто проявляете инициативу при выполнении заданий:" },
            { id: 10, uz: "Notanish vaziyatlarga yaxshi ko‘nikib ketmasligingiz rostmi:", ru: "Правда ли, что вы не привыкли к незнакомым ситуациям:", invert: true },
            { id: 11, uz: "Boshlagan ishingizni tugata olmasangiz asabiylashasizmi:", ru: "Вы расстроены, если не можете закончить то, что начали?" },
            { id: 12, uz: "O‘rtoqlaringiz bilan ko‘p muloqot sizni charchatib qo‘yishi rostmi:", ru: "Правда ли, что общение с друзьями может быть утомительным?", invert: true },
            { id: 13, uz: "O‘rtoqlaringiz uchun ularga tegishli muammollarni yechishda ko‘pincha tashabbus ko‘rsatasizmi:", ru: "Вы часто проявляете инициативу для решения проблем своих друзей:" },
            { id: 14, uz: "O‘zingizni haqligingizni isbotlash siz uchun unchalik muhim emasmi:", ru: "Разве тебе не важно доказать, что ты прав?", invert: true },
            { id: 15, uz: "Maktabdagi (sinfdagi) jamoat ishlarida qatnashasizmi:", ru: "Участвуете ли вы в школьных (классных) общественных работах:" },
            { id: 16, uz: "Agar do‘stlaringiz tomonidan Sizning fikringiz yoki qaroringiz qabul qilinmasa ularni himoya qilishga harakat qilmasligingiz rostmi:", ru: "Правда ли, что вы не пытаетесь защитить своих друзей, если они не согласны с вами?", invert: true },
            { id: 17, uz: "O‘rtoqlaringiz uchun har xil tadbirlarni tashkil etish uchun chin dildan kirishasizmi:", ru: "Вы действительно хотите организовать различные мероприятия для своих друзей:" },
            { id: 18, uz: "Uchrashuvlarga siz ko‘pincha kechikasizmi:", ru: "Вы часто опаздываете на встречи:", invert: true },
            { id: 19, uz: "Siz ko‘pincha hammaning diqqat markazida bo‘lasizmi:", ru: "Вы часто в центре внимания:" },
            { id: 20, uz: "Siz o‘zingizni notanish jamoada noqulay tutishingiz rostmi:", ru: "Правда ли, что вы чувствуете себя некомфортно в незнакомой среде:", invert: true }
        ],
        options: [
            { val: "A", uz: "ha", ru: "да" },
            { val: "B", uz: "ba'zan", ru: "иногда" },
            { val: "C", uz: "yo'q", ru: "нет" }
        ]
    },
    "8": {
        title: { uz: "8-sinf O'quvchilarning qiziqishlari, qobiliyatlari", ru: "8 класс Выявление интересов, способностей и стремлений" },
        desc: { uz: "Agar o'zingizga mos bo'lsa 'Ha', mos kelmasa 'Yo'q' deb belgilang.", ru: "Ответьте «Да», если согласны, и «Нет», если не согласны." },
        type: "category",
        options: [
            { val: "A", uz: "Ha", ru: "Да" },
            { val: "C", uz: "Yo'q", ru: "Нет" }
        ],
        categories: {
            "c1": { uz: "Jismoniy (sport)", ru: "Физические (спорт)" },
            "c2": { uz: "Tashkilotchilik", ru: "Организаторские" },
            "c3": { uz: "Matematik", ru: "Математические" },
            "c4": { uz: "Konstruktorlik-texnika", ru: "Конструкторско-технические" },
            "c5": { uz: "Tasviriy (artistik)", ru: "Изобразительные (Артистические)" },
            "c6": { uz: "Kommunikativ", ru: "Коммуникативные" },
            "c7": { uz: "Musiqiy", ru: "Музыкальные" },
            "c8": { uz: "Badiiy-tasviriy", ru: "Художественно-изобразительные" },
            "c9": { uz: "Filologik (til-adabiyot)", ru: "Филологические" }
        },
        keys: {
            "c1": [1, 10, 19, 28, 37], "c2": [2, 11, 20, 29, 38], "c3": [3, 12, 21, 30, 39],
            "c4": [4, 13, 22, 31, 40], "c5": [5, 14, 23, 32, 41], "c6": [6, 15, 24, 33, 42],
            "c7": [7, 16, 25, 34, 43], "c8": [8, 17, 26, 35, 44], "c9": [9, 18, 27, 36, 45]
        },
        questions: [
            { id: 1, uz: "Uzoq vaqt harakatli o'yinlar o'ynash?", ru: "Долго играть в подвижные игры?" },
            { id: 2, uz: "Har-xil o'yinlarni o'ylab topish?", ru: "Придумывать разные игры?" },
            { id: 3, uz: "Shashka, shaxmat o'ynash?", ru: "Играть в шашки, шахматы?" },
            { id: 4, uz: "Ichida nima borligini bilish uchun o'yinchoqlarni sindirish?", ru: "Ломать игрушки, чтобы узнать, что внутри?" },
            { id: 5, uz: "She'r o'qish yoki qo'shiq aytish?", ru: "Читать стихи или петь песни?" },
            { id: 6, uz: "Begonalar bilan gaplashish yoki savollar berish?", ru: "Разговаривать с незнакомыми людьми или задавать вопросы?" },
            { id: 7, uz: "Musiqa tinglash va raqsga tushish?", ru: "Слушать музыку и танцевать?" },
            { id: 8, uz: "Rasm chizish yoki boshqalar chizayotganda tomosha qilish?", ru: "Рисовать или смотреть, как рисуют другие?" },
            { id: 9, uz: "Ertak tinglash, o'zing ertak yoki voqealar o'ylab topish?", ru: "Слушать сказки, самому придумывать сказки или истории?" },
            
            { id: 10, uz: "Jismoniy tarbiya darslarida yoki sport maktablarida shug'ullanish?", ru: "Заниматься на уроках физкультуры или в спортивных школах, секциях?" },
            { id: 11, uz: "O'z ixtiyoring bilan biror bir ishni tashkillashtirish mas'uliyatini olish?", ru: "Добровольно брать на себя ответственность за организацию какого-либо дела?" },
            { id: 12, uz: "Matematik vazifalarni yechishda bolalarga yordam berish?", ru: "Помогать детям в решении математических задач?" },
            { id: 13, uz: "Buyuk kashfiyotlar haqida o'qish?", ru: "Читать о великих открытиях?" },
            { id: 14, uz: "Badiiy havaskorlik to'garaklarida qatnashish?", ru: "Участвовать в кружках художественной самодеятельности?" },
            { id: 15, uz: "Muammolarni hal qilishda odamlarga yordam berish?", ru: "Помогать людям в решении проблем?" },
            { id: 16, uz: "San'at haqida biror bir yangiliklarni o'qish yoki bilish?", ru: "Читать или узнавать новости об искусстве?" },
            { id: 17, uz: "Tasviriy san'at to'garaklarida shug'ullanish?", ru: "Заниматься в кружках изобразительного искусства?" },
            { id: 18, uz: "Erkin mavzuda insho yozish?", ru: "Писать сочинения на свободную тему?" },
            
            { id: 19, uz: "Sport musobaqalarida qatnashishdan?", ru: "Участия в спортивных соревнованиях?" },
            { id: 20, uz: "Odamlarga ishni taqsimlab berish malakang borligidan?", ru: "Того, что умеете распределять работу между людьми?" },
            { id: 21, uz: "Murakkab matematik masalalarni yecha olishingdan?", ru: "Того, что можете решать сложные математические задачи?" },
            { id: 22, uz: "Elektr va radio asboblarni tuzata olishingdan?", ru: "Того, что можете чинить электрические и радиоприборы?" },
            { id: 23, uz: "Sahnada o'zingni erkin tuta olishingdan?", ru: "Того, что свободно чувствуете себя на сцене?" },
            { id: 24, uz: "Odamlar bilan muloqot qilishingdan?", ru: "Общения с людьми?" },
            { id: 25, uz: "Yangi musiqiy asboblar va musiqa asarlari bilan tanishligingdan?", ru: "Знакомства с новыми музыкальными инструментами и музыкальными произведениями?" },
            { id: 26, uz: "Badiiy ko'rgazmalarga tashrif buyurganingda?", ru: "Посещения художественных выставок?" },
            { id: 27, uz: "Biror bir ko'rgan yoki o'qigan voqealardan?", ru: "Увиденных или прочитанных событий (историй)?" },
            
            { id: 28, uz: "Uzoq muddatli jismoniy mashqlar?", ru: "Длительные физические упражнения?" },
            { id: 29, uz: "Sening tashabbusing va qat'iyating talab qilinadigan ishlar?", ru: "Работа, требующая вашей инициативы и решительности?" },
            { id: 30, uz: "Matematik topishmoqlarni yechish?", ru: "Решение математических головоломок?" },
            { id: 31, uz: "Biror-bir buyumning modelini tayyorlash?", ru: "Изготовление модели какого-либо предмета?" },
            { id: 32, uz: "Spektaklni sahnalashtirishda ishtirok etish?", ru: "Участие в постановке спектакля?" },
            { id: 33, uz: "Odamlarga yordam berish, hamdard bo'lish?", ru: "Помощь людям, сочувствие?" },
            { id: 34, uz: "Biror-bir musiqa asbobini chalish?", ru: "Игра на каком-либо музыкальном инструменте?" },
            { id: 35, uz: "Qalam yoki bo'yoqlarda rasm chizish?", ru: "Рисование карандашом или красками?" },
            { id: 36, uz: "She'r, hikoya yozish yoki kundalik yuritish?", ru: "Написание стихов, рассказов или ведение дневника?" },
            
            { id: 37, uz: "Sport yoki jismoniy mehnat bilan?", ru: "Спортом или физическим трудом?" },
            { id: 38, uz: "G'ayrat bilan mehnat qilish?", ru: "Энергично трудиться (работать с энтузиазмом)?" },
            { id: 39, uz: "Chizmachilik bilan shug'ullanish yoki shaxmat o'ynash?", ru: "Заниматься черчением или играть в шахматы?" },
            { id: 40, uz: "Mexanizm va asboblar bilan ishlash?", ru: "Работать с механизмами и приборами?" },
            { id: 41, uz: "Bemorlar, o'zingdan kichiklar haqida g'amho'rlik qilish?", ru: "Заботиться о больных, младших?" },
            { id: 42, uz: "Sevimli kitob qahramonlari taqdiri haqida o'ylash?", ru: "Размышлять о судьбе любимых книжных героев?" },
            { id: 43, uz: "Musiqiy asarlarni ijro etish?", ru: "Исполнять музыкальные произведения?" },
            { id: 44, uz: "Rasm chizish, loydan biror bir narsa yasash?", ru: "Рисовать, лепить что-нибудь из глины?" },
            { id: 45, uz: "Ma'ruza qilishga tayyorlanish?", ru: "Готовиться к докладу (выступлению)?" }
        ]
    },
    "9": {
        title: { uz: "9-sinf Qiziqishlar xaritasi", ru: "9 класс Карта интересов (А.Е. Голомшток)" },
        desc: { uz: "Savolnomadagi ta'kid-hukmlarga munosabatingizni bildiring.", ru: "Выразите свое отношение к утверждениям." },
        type: "category",
        options: [
            { val: "A", uz: "Ha", ru: "Да" },
            { val: "C", uz: "Yo'q", ru: "Нет" }
        ],
        categories: {
            "c1": { uz: "Fizika va matematika", ru: "Физика и математика" },
            "c2": { uz: "Kimyo va biologiya", ru: "Химия и биология" },
            "c3": { uz: "Radiotexnika va elektronika", ru: "Радиотехника и электроника" },
            "c4": { uz: "Mexanika va konstruktorlik", ru: "Механика и конструирование" },
            "c5": { uz: "Geografiya va geologiya", ru: "География и геология" },
            "c6": { uz: "Adabiyot va san'at", ru: "Литература и искусство" },
            "c7": { uz: "Tarix va siyosat", ru: "История и политика" },
            "c8": { uz: "Pedagogika va tibbiyot", ru: "Педагогика (психология) и медицина" },
            "c9": { uz: "Tadbirkorlik va uy ro'zg'or", ru: "Предпринимательство и домоводство" },
            "c10": { uz: "Sport va harbiy soha", ru: "Спорт и военное дело" }
        },
        keys: {
            "c1": [1,11,21,31,41], "c2": [2,12,22,32,42], "c3": [3,13,23,33,43], "c4": [4,14,24,34,44],
            "c5": [5,15,25,35,45], "c6": [6,16,26,36,46], "c7": [7,17,27,37,47], "c8": [8,18,28,38,48],
            "c9": [9,19,29,39,49], "c10": [10,20,30,40,50]
        },
        questions: [
            {id:1, uz:"Matematika va fizika sohasidagi yangiliklardan xabardor bo'lish.", ru:"Быть в курсе новостей в области математики и физики."},
            {id:2, uz:"O'simliklar va hayvonlar hayoti haqida ko'rsatuvlar tomosha qilish.", ru:"Смотреть передачи о жизни растений и животных."},
            {id:3, uz:"Elektr asbob-uskunalarining tuzilishiga qiziqish.", ru:"Интересоваться устройством электроприборов."},
            {id:4, uz:"Texnikaga oid ilmiy-ommabop jurnallarni o'qish.", ru:"Читать научно-популярные журналы по технике."},
            {id:5, uz:"Turli millatga mansub insonlarning turmush tarziga qiziqish.", ru:"Интересоваться образом жизни людей разных национальностей."},
            {id:6, uz:"Teatr, konsert va ko'rgazmalarga borib turish.", ru:"Посещать театры, концерты и выставки."},
            {id:7, uz:"Mamlakatimiz va chet davlatlardagi voqea-hodisalarga qiziqish.", ru:"Интересоваться событиями в нашей стране и за рубежом."},
            {id:8, uz:"Tibbiyot xodimlarining faoliyatiga qiziqish.", ru:"Интересоваться деятельностью медицинских работников."},
            {id:9, uz:"Uyda, maktabda va sinfda saranjom-sarishtalikka rioya qilish.", ru:"Соблюдать порядок и чистоту дома, в школе и в классе."},
            {id:10, uz:"Urush voqealari va janglar tarixi haqida kitoblar o'qish, filmlar tomosha qilish.", ru:"Читать книги, смотреть фильмы о военных событиях и истории сражений."},
            {id:11, uz:"Matematik masalalarni yechish.", ru:"Решать математические задачи."},
            {id:12, uz:"Kimyo va biologiya sohasidagi yangiliklarga qiziqish.", ru:"Интересоваться новостями в области химии и биологии."},
            {id:13, uz:"Maishiy elektrotexnika asboblarini ta'mirlash.", ru:"Ремонтировать бытовые электротехнические приборы."},
            {id:14, uz:"Fan-texnika yutuqlariga oid ko'rgazmalarga borib turish.", ru:"Посещать выставки достижений науки и техники."},
            {id:15, uz:"O'rganilmagan joylarda bo'lish. Sayohatlarga borish.", ru:"Бывать в неизученных местах. Ходить в походы/путешествовать."},
            {id:16, uz:"Yangi kitoblar, filmlar hamda konsertlar haqidagi maqolalarni o'qish.", ru:"Читать статьи о новых книгах, фильмах и концертах."},
            {id:17, uz:"Maktabdagi jamoat ishlarida faol qatnashish.", ru:"Активно участвовать в общественной работе школы."},
            {id:18, uz:"Sinfdoshlariga o'quv materiallarini o'zlashtirishga ko'maklashish.", ru:"Помогать одноклассникам в усвоении учебного материала."},
            {id:19, uz:"Uy ro'zg'or ishlarini mustaqil bajarish.", ru:"Самостоятельно выполнять работу по дому."},
            {id:20, uz:"Kun tartibiga, sog'lom turmush tarziga rioya qilish.", ru:"Соблюдать режим дня, здоровый образ жизни."},
            {id:21, uz:"Fizikadan tajriba o'tkazish.", ru:"Проводить опыты по физике."},
            {id:22, uz:"Hayvonlarni va o'simliklarni parvarish qilish.", ru:"Ухаживать за животными и растениями."},
            {id:23, uz:"Elektronika va radiotexnika sohasiga oid adabiyotlarni o'qish.", ru:"Читать литературу по электронике и радиотехнике."},
            {id:24, uz:"Soat mexanizmlarini va velosiped qismlarini yig'ish va ta'mirlash.", ru:"Собирать и ремонтировать часовые механизмы и детали велосипеда."},
            {id:25, uz:"Toshlar va minerallardan kolleksiya to'plash.", ru:"Собирать коллекцию камней и минералов."},
            {id:26, uz:"She'r, ertak va hikoyalar yozish, kundalik yuritish.", ru:"Писать стихи, сказки и рассказы, вести дневник."},
            {id:27, uz:"Taniqli siyosatshunoslar hayoti va ijodiga qiziqish, tarixiy kitoblarni o'qish.", ru:"Интересоваться жизнью и творчеством известных политологов, читать исторические книги."},
            {id:28, uz:"Kichik yoshdagi o'quvchilarni dars tayyorlashiga yordamlashish, ular bilan o'ynash.", ru:"Помогать младшим школьникам делать уроки, играть с ними."},
            {id:29, uz:"Oziq-ovqat mahsulotlarini sotib olish, sarf-xarajatlarni hisoblash.", ru:"Покупать продукты питания, рассчитывать расходы."},
            {id:30, uz:"Harbiy o'yinlar o'ynash.", ru:"Играть в военные игры."},
            {id:31, uz:"Darsdan tashqari fizika va matematika fanlaridan qo'shimcha shug'ullanish.", ru:"Дополнительно заниматься физикой и математикой вне уроков."},
            {id:32, uz:"Tabiat hodisalarini tushuntirish va izohlash.", ru:"Объяснять и толковать явления природы."},
            {id:33, uz:"Kompyuter qismlarini yig'ish va ta'mirlash.", ru:"Собирать и ремонтировать детали компьютера."},
            {id:34, uz:"Kompyuterda chizmalar, sxemalar, grafiklar chizish.", ru:"Чертить чертежи, схемы, графики на компьютере."},
            {id:35, uz:"Geologik va geografik ekspeditsiyalarda ishtirok etish.", ru:"Участвовать в геологических и географических экспедициях."},
            {id:36, uz:"O'qigan kitoblari va ko'rgan filmlar haqida do'stlariga so'zlab berish.", ru:"Рассказывать друзьям о прочитанных книгах и просмотренных фильмах."},
            {id:37, uz:"Mamlakatimiz va chet davlatlardagi siyosiy voqealarni kuzatish.", ru:"Наблюдать за политическими событиями в нашей стране и за рубежом."},
            {id:38, uz:"Yosh bolalar va yaqinlari bemor bo'lganda ularni parvarishlash.", ru:"Ухаживать за маленькими детьми и близкими, когда они болеют."},
            {id:39, uz:"Daromad keltiradigan biznes-rejalarni tuzish.", ru:"Составлять бизнес-планы, приносящие доход."},
            {id:40, uz:"Jismoniy tarbiya va sport bilan shug'ullanish.", ru:"Заниматься физкультурой и спортом."},
            {id:41, uz:"Fizika-matematika fan olimpiadalarida qatnashish.", ru:"Участвовать в олимпиадах по физике и математике."},
            {id:42, uz:"Kimyo va biologiyadan laboratoriya tajribalarini o'tkazish.", ru:"Проводить лабораторные опыты по химии и биологии."},
            {id:43, uz:"Elektr asbob-uskunalarning ishlash tartibini tushunish.", ru:"Понимать принцип работы электроприборов."},
            {id:44, uz:"Turli mexanizmlarning qay yo'sinda ishlashiga qiziqish.", ru:"Интересоваться тем, как работают различные механизмы."},
            {id:45, uz:"Geografik va geologik xaritalar bilan ishlash.", ru:"Работать с географическими и геологическими картами."},
            {id:46, uz:"Sahna ko'rinishlari va konsertlarda ishtirok etish.", ru:"Участвовать в сценических постановках и концертах."},
            {id:47, uz:"Boshqa davlatlarning siyosati va iqtisodiyotiga qiziqish.", ru:"Интересоваться политикой и экономикой других стран."},
            {id:48, uz:"Insonlarning xulq-atvori va organizminig tuzilishini o'rganish.", ru:"Изучать поведение людей и строение организма."},
            {id:49, uz:"Oila byudjetini rejalashtirishda ishtirok etish.", ru:"Участвовать в планировании семейного бюджета."},
            {id:50, uz:"Sport musobaqalarida qatnashish.", ru:"Участвовать в спортивных соревнованиях."}
        ]
    }
};
