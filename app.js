const supabaseUrl = 'https://vxxzlmovxctlwmextipy.supabase.co';
const supabaseKey = 'sb_publishable_FwxP81L7WF4H5qXB8yCPDg_7Lam2oJX';
const supabaseClient = window.supabase ? window.supabase.createClient(supabaseUrl, supabaseKey) : null;

let currentLang = 'uz';
let currentTest = null;
let userAnswers = {};
let currentUser = "";
let currentUserClass = "";
let currentUserSchool = "";
let modalConfirmCallback = null;
let testStartTime = null;
let currentAdminFilter = 'none';

function showModal(message, isConfirm = false, onConfirm = null) {
    const overlay = document.getElementById('custom-modal');
    document.getElementById('modal-message').textContent = message;
    document.getElementById('modal-title').textContent = currentLang === 'uz' ? 'Xabar' : 'Сообщение';
    document.getElementById('modal-btn-cancel').textContent = currentLang === 'uz' ? 'Bekor qilish' : 'Отмена';
    
    if (isConfirm) {
        document.getElementById('modal-btn-cancel').style.display = 'block';
        modalConfirmCallback = onConfirm;
    } else {
        document.getElementById('modal-btn-cancel').style.display = 'none';
        modalConfirmCallback = null;
    }
    
    overlay.classList.add('active');
}

function hideModal() {
    document.getElementById('custom-modal').classList.remove('active');
}

document.addEventListener('DOMContentLoaded', () => {
    // Language switching
    document.getElementById('btn-uz').addEventListener('click', () => setLanguage('uz'));
    document.getElementById('btn-ru').addEventListener('click', () => setLanguage('ru'));
    
    // Test selection
    document.querySelectorAll('.test-card').forEach(card => {
        card.querySelector('.btn-primary').addEventListener('click', () => {
            startTest(card.getAttribute('data-test'));
        });
    });
    
    // Login & Admin
    document.getElementById('btn-login').addEventListener('click', handleLogin);

    const gradeInputEl = document.getElementById('user-grade-input');
    if (gradeInputEl) {
        gradeInputEl.addEventListener('change', (e) => {
            const grade = e.target.value;
            const letterSelect = document.getElementById('user-letter-input');
            const container = document.getElementById('letter-container');
            letterSelect.innerHTML = '<option value="" disabled selected>Harfni tanlang</option>';
            
            let letters = [];
            if (grade === '5') letters = ['A', 'B', 'V', 'G', 'D', 'E', 'J', 'Z'];
            else if (grade === '6') letters = ['A', 'B', 'V', 'G', 'D'];
            else if (grade === '7') letters = ['A', 'B', 'D', 'E', 'G', 'V'];
            else if (grade === '8') letters = ['A', 'B', 'D', 'E', 'G', 'V'];
            else if (grade === '9') letters = ['A', 'B', 'D', 'G', 'V'];
            
            letters.forEach(l => {
                const opt = document.createElement('option');
                opt.value = l;
                opt.textContent = `"${l}" - sinfi`;
                letterSelect.appendChild(opt);
            });
            
            container.style.display = 'block';
        });
    }

    document.getElementById('btn-admin-logout').addEventListener('click', () => {
        currentUser = "";
        document.getElementById('user-name-input').value = "";
        showScreen('screen-login');
    });
    document.getElementById('admin-search').addEventListener('input', renderAdminTable);
    document.getElementById('btn-export-csv').addEventListener('click', exportToCSV);
    
    // Modal events
    document.getElementById('modal-btn-ok').addEventListener('click', () => {
        hideModal();
        if (modalConfirmCallback) {
            modalConfirmCallback();
            modalConfirmCallback = null;
        }
    });
    document.getElementById('modal-btn-cancel').addEventListener('click', hideModal);
    
    document.getElementById('details-btn-close').addEventListener('click', () => {
        document.getElementById('details-modal').classList.remove('active');
    });
    
    document.getElementById('btn-download-pdf').addEventListener('click', () => {
        const element = document.getElementById('details-content');
        const opt = {
            margin:       10,
            filename:     `${window.currentStudentName || 'natijalar'}.pdf`,
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2 },
            jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };
        html2pdf().set(opt).from(element).save();
    });
    
    document.querySelectorAll('.pill').forEach(pill => {
        pill.addEventListener('click', () => {
            currentAdminFilter = pill.getAttribute('data-filter');
            document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            renderAdminTable();
        });
    });
    
    document.getElementById('admin-search').addEventListener('input', renderAdminTable);
    document.getElementById('btn-export-csv').addEventListener('click', exportToCSV);
    
    // Navigation
    document.getElementById('btn-back').addEventListener('click', () => {
        showHome();
    });
    document.getElementById('btn-home').addEventListener('click', showHome);
    document.getElementById('btn-submit').addEventListener('click', calculateResults);
});

function setLanguage(lang) {
    currentLang = lang;
    document.getElementById('btn-uz').classList.toggle('active', lang === 'uz');
    document.getElementById('btn-ru').classList.toggle('active', lang === 'ru');
    
    document.querySelectorAll('[data-uz][data-ru]').forEach(el => {
        el.textContent = el.getAttribute(`data-${lang}`);
    });
    
    if (currentTest) {
        renderQuestions();
        document.getElementById('test-title').textContent = testsData[currentTest].title[currentLang];
        document.getElementById('test-desc').textContent = testsData[currentTest].desc[currentLang];
    }
}

function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function handleLogin() {
    const nameInput = document.getElementById('user-name-input').value.trim();
    const gradeInput = document.getElementById('user-grade-input').value;
    const letterInput = document.getElementById('user-letter-input').value;
    const schoolInput = document.getElementById('user-school-input').value;
    
    const nameLower = nameInput.toLowerCase();
    const schoolAdmins = {
        "3": "diyora", "4": "dilorom", "6": "shaxribonu", "8": "asadbek", "9": "muxlisa",
        "10": "sayyora", "12": "muxlisa", "13": "rahimjon", "14": "karima", "15": "yorqinoy",
        "16": "eldor", "17": "sanjar", "18": "zafarjon", "19": "navruza", "21": "asiljon",
        "22": "nematjon", "23": "alohiddin", "24": "tursunoy", "25": "sardorbek", "28": "mohita"
    };

    if (nameLower === 'islombek hakimov') {
        currentUser = nameInput;
        currentUserSchool = "all";
        showAdminPanel();
    } else if (schoolInput && schoolAdmins[schoolInput] === nameLower) {
        currentUser = nameInput;
        currentUserSchool = schoolInput;
        showAdminPanel();
    } else if (nameInput.length > 2 && gradeInput && letterInput && schoolInput) {
        const classInput = gradeInput + letterInput;
        currentUser = nameInput;
        currentUserClass = classInput;
        currentUserSchool = schoolInput;
        
        // Auto-detect test based on class
        let targetTest = null;
        if (classInput.includes('5') || classInput.includes('6')) {
            targetTest = '5';
        } else if (classInput.includes('7')) {
            targetTest = '7';
        } else if (classInput.includes('8')) {
            targetTest = '8';
        } else if (classInput.includes('9')) {
            targetTest = '9';
        }
        
        if (targetTest) {
            startTest(targetTest);
        } else {
            showModal(currentLang === 'uz' ? "Sinfingiz xato kiritildi! (Faqat 5, 6, 7, 8 yoki 9-sinflar uchun)" : "Класс введен неверно! (Только для 5, 6, 7, 8 или 9 классов)");
        }
    } else {
        showModal(currentLang === 'uz' ? "Iltimos, ism, maktab va sinfingizni to'liq kiriting!" : "Пожалуйста, введите ваше имя, школу и класс полностью!");
    }
}

function showAdminPanel() {
    renderAdminTable();
    showScreen('screen-admin');
}

async function renderAdminTable() {
    const tbody = document.getElementById('admin-table-body');
    tbody.innerHTML = '<tr><td colspan="8" style="text-align: center; padding: 2rem;">Yuklanmoqda...</td></tr>';
    
    let allResults = [];
    try {
        if (!supabaseClient) throw new Error('Supabase client not loaded');
        let query = supabaseClient
            .from('sorovnoma_results')
            .select('*')
            .order('id', { ascending: false });
            
        if (currentUserSchool !== 'all') {
            query = query.eq('school', currentUserSchool);
        }
        
        const { data, error } = await query;
            
        if (error) throw error;
        allResults = data.map(item => ({
            name: item.name,
            school: item.school,
            className: item.class_name,
            testName: item.test_name,
            date: item.date,
            startTime: item.start_time,
            endTime: item.end_time,
            summary: item.summary,
            answers: item.answers
        }));
        localStorage.setItem('sorovnoma_results', JSON.stringify(allResults));
    } catch (e) {
        console.error("Supabase get error:", e);
        allResults = JSON.parse(localStorage.getItem('sorovnoma_results') || '[]');
        if (currentUserSchool !== 'all') {
            allResults = allResults.filter(r => r.school === currentUserSchool);
        }
    }

    tbody.innerHTML = '';
    const query = document.getElementById('admin-search').value.toLowerCase();
    
    // Stats calculation
    const today = new Date().toLocaleDateString();
    let todayCount = 0;
    allResults.forEach(r => {
        if (r.date === today) todayCount++;
    });
    
    document.getElementById('stat-total').textContent = allResults.length;
    document.getElementById('stat-today').textContent = todayCount;
    document.getElementById('stat-finished').textContent = allResults.length;
    document.getElementById('stat-unfinished').textContent = 0;
    
    // Filter
    let results = allResults;
    if (currentAdminFilter === 'none') {
        if (!query) results = []; // Empty if no filter and no search
    } else if (currentAdminFilter !== 'all') {
        results = results.filter(r => r.testName.includes(currentAdminFilter));
    }
    
    if (query) {
        let baseResults = currentAdminFilter === 'none' ? allResults : results;
        results = baseResults.filter(r => r.name.toLowerCase().includes(query) || r.testName.toLowerCase().includes(query) || (r.className && r.className.toLowerCase().includes(query)));
    }
    
    window.currentFilteredResults = results;
    
    if (results.length === 0) {
        tbody.innerHTML = `<tr><td colspan="8" style="text-align: center; padding: 2rem; color: #64748b;">Ma'lumot topilmadi</td></tr>`;
        return;
    }
    
    results.forEach((res, index) => {
        const tr = document.createElement('tr');
        
        let badgeClass = 'badge-5';
        if (res.testName.includes('7')) badgeClass = 'badge-7';
        if (res.testName.includes('8')) badgeClass = 'badge-8';
        if (res.testName.includes('9')) badgeClass = 'badge-9';
        
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td style="font-weight: 600; color: #0f172a;">${res.name} <span style="color: #64748b; font-size: 0.85em;">(${res.school ? res.school + '-maktab, ' : ''}${res.className || '-'})</span></td>
            <td>-</td>
            <td><span class="badge ${badgeClass}">${res.testName}</span></td>
            <td style="font-size: 0.9rem;">${res.startTime || res.date}</td>
            <td style="font-size: 0.9rem;">${res.endTime || res.date}</td>
            <td style="font-size: 0.9rem; color: #334155;">${res.summary}</td>
            <td><button class="btn-primary" style="padding: 0.4rem 0.8rem; font-size: 0.85rem; width: auto; margin: 0;" onclick="viewAnswers(${index})">Ko'rish</button></td>
        `;
        tbody.appendChild(tr);
    });
}

window.viewAnswers = function(index) {
    const res = window.currentFilteredResults[index];
    if (!res) return;
    
    window.currentStudentName = res.name.replace(/\s+/g, '_');
    const answers = res.answers || [];
    const content = document.getElementById('details-content');
    
    let html = `
        <div style="font-family: Arial, sans-serif; padding: 10px;">
            <h2 style="text-align: center; margin-bottom: 20px; color: #0f172a;">O'quvchi Natijasi</h2>
            <div style="margin-bottom: 20px; padding: 15px; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
                <p style="margin-bottom: 8px;"><strong>Ism Familiya:</strong> ${res.name}</p>
                <p style="margin-bottom: 8px;"><strong>Maktab va Sinf:</strong> ${res.school ? res.school + '-maktab, ' : ''}${res.className || '-'}</p>
                <p style="margin-bottom: 8px;"><strong>Test Turi:</strong> ${res.testName}</p>
                <p style="margin-bottom: 8px;"><strong>Sana va Vaqt:</strong> ${res.date} (${res.startTime} - ${res.endTime})</p>
                <p style="margin-bottom: 8px;"><strong>Xulosa:</strong> ${res.summary}</p>
            </div>
            <h3 style="margin-bottom: 15px; color: #0f172a; border-bottom: 2px solid #e2e8f0; padding-bottom: 5px;">Batafsil Javoblar</h3>
    `;
    
    if (answers.length === 0) {
        html += "<p>Javoblar topilmadi</p>";
    } else {
        html += answers.map(item => {
            let finalAns = item.a;
            if (finalAns === 'A') finalAns = 'Ha';
            else if (finalAns === 'B') finalAns = 'Aytish qiyin';
            else if (finalAns === 'C') finalAns = "Yo'q";
            
            return `
            <div style="margin-bottom: 12px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">
                <div style="font-weight: 600; color: #0f172a; margin-bottom: 4px; font-size: 14px;">${item.q}</div>
                <div style="color: #2563eb; font-size: 14px;">${finalAns}</div>
            </div>
        `}).join('');
    }
    
    html += `</div>`;
    content.innerHTML = html;
    
    document.getElementById('details-modal').classList.add('active');
};

function exportToCSV() {
    const results = JSON.parse(localStorage.getItem('sorovnoma_results') || '[]');
    if (results.length === 0) {
        showModal(currentLang === 'uz' ? "Saqlangan natijalar yo'q!" : "Нет сохраненных результатов!");
        return;
    }
    
    let csvContent = "data:text/csv;charset=utf-8,\uFEFF";
    csvContent += "Ism Familiya,Maktab,Sinf,Test Turi,Boshladi,Tugatdi,Xulosa,Javoblar\n";
    
    results.forEach(res => {
        const name = `"${res.name.replace(/"/g, '""')}"`;
        const school = `"${(res.school || '').replace(/"/g, '""')}"`;
        const cls = `"${(res.className || '').replace(/"/g, '""')}"`;
        const testName = `"${res.testName.replace(/"/g, '""')}"`;
        const start = `"${res.startTime || res.date}"`;
        const end = `"${res.endTime || res.date}"`;
        const summary = `"${res.summary.replace(/"/g, '""')}"`;
        const ans = `"${(res.answers || []).map(a => a.q + ': ' + a.a).join(' | ').replace(/"/g, '""')}"`;
        
        csvContent += `${name},${school},${cls},${testName},${start},${end},${summary},${ans}\n`;
    });
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Natijalar_${new Date().toLocaleDateString()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function showHome() {
    currentTest = null;
    userAnswers = {};
    currentUser = "";
    currentUserClass = "";
    currentUserSchool = "";
    document.getElementById('user-name-input').value = "";
    document.getElementById('user-school-input').value = "";
    document.getElementById('user-grade-input').value = "";
    document.getElementById('user-letter-input').innerHTML = '<option value="" disabled selected>Harfni tanlang</option>';
    document.getElementById('letter-container').style.display = 'none';
    showScreen('screen-login');
}

function startTest(testId) {
    currentTest = testId;
    testStartTime = new Date();
    userAnswers = {};
    const test = testsData[testId];
    
    document.getElementById('test-title').textContent = test.title[currentLang];
    document.getElementById('test-desc').textContent = test.desc[currentLang];
    
    renderQuestions();
    updateProgress();
    showScreen('screen-test');
}

function updateAnswer(id, val, isArray = false, isAdd = false) {
    if (isArray) {
        if (!userAnswers[id]) userAnswers[id] = [];
        if (isAdd) {
            if (!userAnswers[id].includes(val)) userAnswers[id].push(val);
        } else {
            userAnswers[id] = userAnswers[id].filter(item => item !== val);
        }
        if (userAnswers[id].length === 0) delete userAnswers[id];
    } else {
        if (val) userAnswers[id] = val;
        else delete userAnswers[id];
    }
    updateProgress();
}

function renderQuestions() {
    const container = document.getElementById('questions-container');
    container.innerHTML = '';
    
    const test = testsData[currentTest];
    
    test.questions.forEach((q, index) => {
        const qCard = document.createElement('div');
        qCard.className = 'question-card';
        
        const qText = document.createElement('div');
        qText.className = 'question-text';
        qText.textContent = (test.type !== 'survey') ? `${index + 1}. ${q[currentLang]}` : q[currentLang];
        qCard.appendChild(qText);
        
        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'options';
        
        if (test.type === 'single' || test.type === 'category') {
            test.options.forEach(opt => {
                const label = document.createElement('label');
                label.className = 'option-label';
                if (userAnswers[q.id] === opt.val) label.classList.add('selected');
                
                const input = document.createElement('input');
                input.type = 'radio';
                input.name = `q_${q.id}`;
                input.value = opt.val;
                if (userAnswers[q.id] === opt.val) input.checked = true;
                
                input.addEventListener('change', (e) => {
                    userAnswers[q.id] = e.target.value;
                    updateProgress();
                    optionsDiv.querySelectorAll('.option-label').forEach(l => l.classList.remove('selected'));
                    label.classList.add('selected');
                });
                
                const customRadio = document.createElement('div');
                customRadio.className = 'radio-custom';
                
                label.appendChild(input);
                label.appendChild(customRadio);
                label.appendChild(document.createTextNode(opt[currentLang]));
                optionsDiv.appendChild(label);
            });
            qCard.appendChild(optionsDiv);
        } 
        else if (test.type === 'survey') {
            if (q.type === 'checkbox') {
                q.options.forEach(opt => {
                    const label = document.createElement('label');
                    label.className = 'option-label';
                    let val = opt.uz;
                    
                    const input = document.createElement('input');
                    input.type = 'checkbox';
                    input.value = val;
                    if (userAnswers[q.id] && userAnswers[q.id].includes(val)) {
                        input.checked = true;
                        label.classList.add('selected');
                    }
                    
                    input.addEventListener('change', (e) => {
                        updateAnswer(q.id, val, true, e.target.checked);
                        if(e.target.checked) label.classList.add('selected');
                        else label.classList.remove('selected');
                    });
                    
                    const customCb = document.createElement('div');
                    customCb.className = 'checkbox-custom';
                    
                    label.appendChild(input);
                    label.appendChild(customCb);
                    label.appendChild(document.createTextNode(opt[currentLang]));
                    optionsDiv.appendChild(label);
                });
                
                if (q.hasOther) {
                    const label = document.createElement('label');
                    label.className = 'option-label';
                    const input = document.createElement('input');
                    input.type = 'checkbox';
                    input.value = 'other';
                    
                    const customCb = document.createElement('div');
                    customCb.className = 'checkbox-custom';
                    
                    const otherInput = document.createElement('input');
                    otherInput.type = 'text';
                    otherInput.className = 'conditional-input';
                    otherInput.placeholder = currentLang === 'uz' ? 'Boshqa...' : 'Другое...';
                    
                    if (userAnswers[q.id + '_other_checked']) {
                        input.checked = true;
                        label.classList.add('selected');
                        otherInput.classList.add('active');
                        otherInput.value = userAnswers[q.id + '_other_text'] || '';
                    }

                    input.addEventListener('change', (e) => {
                        if (e.target.checked) {
                            label.classList.add('selected');
                            otherInput.classList.add('active');
                            userAnswers[q.id + '_other_checked'] = true;
                        } else {
                            label.classList.remove('selected');
                            otherInput.classList.remove('active');
                            delete userAnswers[q.id + '_other_checked'];
                        }
                        updateProgress();
                    });
                    
                    otherInput.addEventListener('input', (e) => {
                        userAnswers[q.id + '_other_text'] = e.target.value;
                        updateProgress();
                    });
                    
                    label.appendChild(input);
                    label.appendChild(customCb);
                    label.appendChild(document.createTextNode(currentLang === 'uz' ? "Boshqa" : "Другое"));
                    optionsDiv.appendChild(label);
                    
                    const wrapper = document.createElement('div');
                    wrapper.style.width = "100%";
                    wrapper.appendChild(otherInput);
                    optionsDiv.appendChild(wrapper);
                }
                qCard.appendChild(optionsDiv);
            } 
            else if (q.type === 'text') {
                const input = document.createElement('input');
                input.type = 'text';
                input.value = userAnswers[q.id] || '';
                input.addEventListener('input', (e) => {
                    updateAnswer(q.id, e.target.value);
                });
                optionsDiv.appendChild(input);
                qCard.appendChild(optionsDiv);
            }
            else if (q.type === 'textarea') {
                const input = document.createElement('textarea');
                input.value = userAnswers[q.id] || '';
                input.addEventListener('input', (e) => {
                    updateAnswer(q.id, e.target.value);
                });
                optionsDiv.appendChild(input);
                qCard.appendChild(optionsDiv);
            }
            else if (q.type === 'text_multiple') {
                const groupDiv = document.createElement('div');
                groupDiv.className = 'text-group';
                
                if (!userAnswers[q.id]) userAnswers[q.id] = [];
                
                for (let i = 0; i < q.count; i++) {
                    const input = document.createElement('input');
                    input.type = 'text';
                    input.placeholder = (i + 1) + ".";
                    if (userAnswers[q.id][i]) input.value = userAnswers[q.id][i];
                    
                    input.addEventListener('input', (e) => {
                        if(!userAnswers[q.id]) userAnswers[q.id] = [];
                        userAnswers[q.id][i] = e.target.value;
                        updateProgress();
                    });
                    groupDiv.appendChild(input);
                }
                optionsDiv.appendChild(groupDiv);
                qCard.appendChild(optionsDiv);
            }
            else if (q.type === 'radio_with_text') {
                const textInputWrapper = document.createElement('div');
                textInputWrapper.style.width = "100%";
                
                const textInput = document.createElement('input');
                textInput.type = 'text';
                textInput.className = 'conditional-input';
                textInput.placeholder = q.textPrompt[currentLang];
                textInputWrapper.appendChild(textInput);
                
                if (userAnswers[q.id] === q.triggerValue) {
                    textInput.classList.add('active');
                    textInput.value = userAnswers[q.id + '_text'] || '';
                }

                q.options.forEach(opt => {
                    const label = document.createElement('label');
                    label.className = 'option-label';
                    if (userAnswers[q.id] === opt.val) label.classList.add('selected');
                    
                    const input = document.createElement('input');
                    input.type = 'radio';
                    input.name = `q_${q.id}`;
                    input.value = opt.val;
                    if (userAnswers[q.id] === opt.val) input.checked = true;
                    
                    input.addEventListener('change', (e) => {
                        userAnswers[q.id] = e.target.value;
                        optionsDiv.querySelectorAll('.option-label').forEach(l => l.classList.remove('selected'));
                        label.classList.add('selected');
                        
                        if (e.target.value === q.triggerValue) {
                            textInput.classList.add('active');
                        } else {
                            textInput.classList.remove('active');
                        }
                        updateProgress();
                    });
                    
                    textInput.addEventListener('input', (e) => {
                        userAnswers[q.id + '_text'] = e.target.value;
                        updateProgress();
                    });
                    
                    const customRadio = document.createElement('div');
                    customRadio.className = 'radio-custom';
                    
                    label.appendChild(input);
                    label.appendChild(customRadio);
                    label.appendChild(document.createTextNode(opt[currentLang]));
                    optionsDiv.appendChild(label);
                });
                
                optionsDiv.appendChild(textInputWrapper);
                qCard.appendChild(optionsDiv);
            }
        }
        
        container.appendChild(qCard);
    });
}

function updateProgress() {
    if (!currentTest) return;
    const test = testsData[currentTest];
    const total = test.questions.length;
    let answered = 0;
    
    if (test.type === 'survey') {
        // Survey allows some flexibility, just make sure at least half are touched or just allow submit anytime
        answered = Object.keys(userAnswers).filter(k => !k.includes('_text') && !k.includes('_checked')).length;
        // In survey form we make everything optional basically, so user can always submit
        document.getElementById('progress-bar').style.width = '100%';
        const submitBtn = document.getElementById('btn-submit');
        submitBtn.style.opacity = '1';
        submitBtn.style.pointerEvents = 'auto';
    } else {
        answered = Object.keys(userAnswers).length;
        const percentage = (answered / total) * 100;
        document.getElementById('progress-bar').style.width = `${percentage}%`;
        
        const submitBtn = document.getElementById('btn-submit');
        if (answered === total) {
            submitBtn.style.opacity = '1';
            submitBtn.style.pointerEvents = 'auto';
        } else {
            submitBtn.style.opacity = '0.5';
            submitBtn.style.pointerEvents = 'none';
        }
    }
}

function calculateResults() {
    const test = testsData[currentTest];
    const resultsContent = document.getElementById('results-content');
    resultsContent.innerHTML = '';
    
    if (test.type === 'single') {
        let score = 0;
        test.questions.forEach(q => {
            const ans = userAnswers[q.id];
            if (q.invert) {
                if (ans === 'C') score += 1;
            } else {
                if (ans === 'A') score += 1;
            }
        });
        
        let feedbackUz, feedbackRu;
        if (score >= 15) {
            feedbackUz = "Yuqori darajadagi tashkilotchilik qobiliyatidan darak beradi.";
            feedbackRu = "Свидетельствует о высоком уровне организаторских способностей.";
        } else if (score >= 13) {
            feedbackUz = "Tashkilochilik qobiliyatining o‘rtacha darajasi.";
            feedbackRu = "Средний уровень организаторских способностей.";
        } else {
            feedbackUz = "Tashkilotchilik qobiliyatining juda pastligi.";
            feedbackRu = "Очень низкая организаторская способность.";
        }
        
        
        let resultSummary = `${score} / 20 - ${currentLang === 'uz' ? feedbackUz : feedbackRu}`;
        saveResult(resultSummary);
        
        resultsContent.innerHTML = `
            <div class="result-score">${score} / 20</div>
            <div class="result-desc">${currentLang === 'uz' ? feedbackUz : feedbackRu}</div>
        `;
    } 
    else if (test.type === 'category') {
        const scores = {};
        for (const cat in test.keys) scores[cat] = 0;
        
        let maxPointsCat = test.keys['c1'].length;
        
        test.questions.forEach(q => {
            if (userAnswers[q.id] === 'A') {
                for (const cat in test.keys) {
                    if (test.keys[cat].includes(q.id)) {
                        scores[cat]++;
                    }
                }
            }
        });
        
        const sortedCats = Object.keys(scores).sort((a, b) => scores[b] - scores[a]);
        
        let html = `<div class="result-categories">`;
        sortedCats.forEach(cat => {
            const percent = (scores[cat] / maxPointsCat) * 100;
            html += `
                <div class="category-item">
                    <div class="category-name">${test.categories[cat][currentLang]}</div>
                    <div class="category-bar-bg">
                        <div class="category-bar-fill" style="width: ${percent}%"></div>
                    </div>
                    <div class="category-score">${scores[cat]}</div>
                </div>
            `;
        });
        html += `</div>`;
        let resultSummary = `Eng yuqori: ${test.categories[sortedCats[0]][currentLang]} (${scores[sortedCats[0]]} ball)`;
        saveResult(resultSummary);
        resultsContent.innerHTML = html;
        
        setTimeout(() => {
            document.querySelectorAll('.category-bar-fill').forEach(el => {
                const width = el.style.width;
                el.style.width = '0%';
                setTimeout(() => { el.style.width = width; }, 50);
            });
        }, 100);
    }
    else if (test.type === 'survey') {
        let html = `<div class="survey-results-list">`;
        html += `<h3 style="margin-bottom: 1.5rem; text-align: center; color: var(--primary);">${currentLang === 'uz' ? "Sizning natijangiz (Avtomatik xulosa):" : "Ваш результат (Автоматический вывод):"}</h3>`;
        
        // Automated logic for 5-6 grade
        const scores = { it: 0, art: 0, social: 0, nature: 0, sport: 0, business: 0 };
        const mappings = {
            "Kompyuter / IT": "it", "Компьютеры / IT": "it", "Texnika va muhandislik": "it", "Техника и инженерия": "it", "Texnika va qurilmalar": "it", "Техника и устройства": "it", "Kompyuter bilan ishlash": "it", "Работа с компьютером": "it", "IT / robototexnika": "it", "IT / робототехника": "it",
            "San'at va ijod": "art", "Искусство и творчество": "art", "Media / jurnalistika": "art", "Медиа / журналистика": "art", "Ijodiy ishlar": "art", "Творческая работа": "art", "Rasm / dizayn": "art", "Рисование / дизайн": "art", "Musiqa": "art", "Музыка": "art", "Teatr": "art", "Театр": "art", "Ijodkor": "art", "Творец/созидатель": "art", "Kitobxonlik": "art", "Чтение книг": "art",
            "Ta'lim va pedagogika": "social", "Образование и педагогика": "social", "Huquq va davlat xizmati": "social", "Право и госслужба": "social", "Odamlar bilan ishlash": "social", "Работа с людьми": "social", "Bolalar bilan ishlash": "social", "Работа с детей": "social", "Debat": "social", "Дебаты": "social", "Xorijiy tillar": "social", "Иностранные языки": "social", "O'qituvchi": "social", "Учитель": "social", "Rahbar": "social", "Руководитель": "social", "Jamoa bilan ishlash": "social", "Работа в команде": "social",
            "Tibbiyot": "nature", "Медицина": "nature", "Tabiat va ekologiya": "nature", "Природа и экология": "nature", "Hayvonlar va tabiat": "nature", "Животные и природа": "nature", "Ekologiya": "nature", "Экология": "nature",
            "Sport": "sport", "Спорт": "sport", "Sportchi": "sport", "Спортсмен": "sport",
            "Biznes va tadbirkorlik": "business", "Бизнес и предпринимательство": "business", "Mustaqil ishlash": "business", "Самостоятельная работа": "business", "Tadbirkor": "business", "Предприниматель": "business"
        };
        
        test.questions.forEach(q => {
            if (q.type === 'checkbox' && userAnswers[q.id]) {
                userAnswers[q.id].forEach(ans => {
                    const engText = q.options.find(o => o.uz === ans || o.ru === ans);
                    const uzText = engText ? engText.uz : ans;
                    if (mappings[uzText]) scores[mappings[uzText]] += 1;
                    const ruText = engText ? engText.ru : ans;
                    if (mappings[ruText]) scores[mappings[ruText]] += 1;
                });
            }
        });
        
        let maxCategory = 'social';
        let maxScore = -1;
        for (const cat in scores) {
            if (scores[cat] > maxScore) {
                maxScore = scores[cat];
                maxCategory = cat;
            }
        }
        
        const conclusions = {
            it: {
                uz: { qiz: "Texnologiyalar va aniq fanlar", moyil: "IT-mutaxassis, Muhandis, Dasturchi", tog: "IT / Robototexnika, Dasturlash" },
                ru: { qiz: "Технологии и точные науки", moyil: "IT-специалист, Инженер, Программист", tog: "IT / Робототехника, Программирование" }
            },
            art: {
                uz: { qiz: "Ijod va san'at", moyil: "Dizayner, Rassom, Musiqachi, Jurnalist", tog: "Rasm, Musiqa, Teatr, Kitobxonlik" },
                ru: { qiz: "Творчество и искусство", moyil: "Дизайнер, Художник, Музыкант, Журналист", tog: "Рисование, Музыка, Театр" }
            },
            social: {
                uz: { qiz: "Odamlar bilan ishlash va gumanitar fanlar", moyil: "O'qituvchi, Huquqshunos, Rahbar, Psixolog", tog: "Xorijiy tillar, Debat, Notiqlik" },
                ru: { qiz: "Работа с людьми и гуманитарные науки", moyil: "Учитель, Юрист, Руководитель, Психолог", tog: "Иностранные языки, Дебаты" }
            },
            nature: {
                uz: { qiz: "Tabiat va inson salomatligi", moyil: "Shifokor, Ekolog, Biolog, Veterinariya", tog: "Biologiya, Ekologiya, Yosh tabiatshunoslar" },
                ru: { qiz: "Природа и здоровье человека", moyil: "Врач, Эколог, Биолог, Ветеринар", tog: "Биология, Экология, Юные натуралисты" }
            },
            sport: {
                uz: { qiz: "Jismoniy harakat va sport", moyil: "Professional sportchi, Murabbiy", tog: "Sport seksiyalari, Jismoniy tarbiya" },
                ru: { qiz: "Физическая активность и спорт", moyil: "Профессиональный спортсмен, Тренер", tog: "Спортивные секции" }
            },
            business: {
                uz: { qiz: "Tadbirkorlik va moliya", moyil: "Biznesmen, Menejer, Moliyachi", tog: "Moliyaviy savodxonlik, Liderlik klubi" },
                ru: { qiz: "Предпринимательство и финансы", moyil: "Бизнесмен, Менеджер, Финансист", tog: "Финансовая грамотность, Клуб лидеров" }
            }
        };
        
        const finalConclusion = conclusions[maxCategory][currentLang];
        
        let resultSummary = `Qiziqish: ${finalConclusion.qiz} | Moyillik: ${finalConclusion.moyil} | To'garak: ${finalConclusion.tog}`;
        saveResult(resultSummary);
        
        html += `
            <div style="background: rgba(37, 99, 235, 0.05); padding: 1.5rem; border: 1px solid rgba(37, 99, 235, 0.2); border-radius: 8px; margin-bottom: 2rem;">
                <p><strong>${currentLang === 'uz' ? "Asosiy qiziqish:" : "Основной интерес:"}</strong> ${finalConclusion.qiz}</p>
                <p><strong>${currentLang === 'uz' ? "Kasbiy moyilligi:" : "Профессиональная склонность:"}</strong> ${finalConclusion.moyil}</p>
                <p><strong>${currentLang === 'uz' ? "Tavsiya etiladigan to'garak/yo'nalish:" : "Рекомендуемый кружок/направление:"}</strong> ${finalConclusion.tog}</p>
            </div>
        `;
        
        html += `<h4 style="margin-bottom: 1rem; color: var(--text-color); border-bottom: 1px solid var(--card-border); padding-bottom: 0.5rem;">${currentLang === 'uz' ? "Batafsil javoblar:" : "Подробные ответы:"}</h4>`;
        
        test.questions.forEach(q => {
            let answerText = "";
            
            if (q.type === 'checkbox') {
                let ansArray = [];
                if (userAnswers[q.id]) {
                    q.options.forEach(o => {
                        if (userAnswers[q.id].includes(o.uz)) {
                            ansArray.push(o[currentLang]);
                        }
                    });
                }
                if (userAnswers[q.id + '_other_checked']) {
                    ansArray.push((currentLang==='uz'?"Boshqa: ":"Другое: ") + (userAnswers[q.id + '_other_text'] || ""));
                }
                answerText = ansArray.join(", ");
            } 
            else if (q.type === 'text' || q.type === 'textarea') {
                answerText = userAnswers[q.id] || "-";
            }
            else if (q.type === 'text_multiple') {
                if (userAnswers[q.id] && Array.isArray(userAnswers[q.id])) {
                    answerText = userAnswers[q.id].filter(x => x).join(", ");
                }
            }
            else if (q.type === 'radio_with_text') {
                if (userAnswers[q.id]) {
                    const opt = q.options.find(o => o.val === userAnswers[q.id]);
                    answerText = opt ? opt[currentLang] : userAnswers[q.id];
                    if (userAnswers[q.id] === q.triggerValue && userAnswers[q.id + '_text']) {
                        answerText += " (" + userAnswers[q.id + '_text'] + ")";
                    }
                }
            }
            
            if (!answerText) answerText = "-";
            
            html += `
                <div class="survey-item">
                    <div class="survey-q">${q[currentLang]}</div>
                    <div class="survey-a">${answerText}</div>
                </div>
            `;
        });
        
        html += `</div>`;
        resultsContent.innerHTML = html;
    }
    
    showScreen('screen-results');
}

async function saveResult(summary) {
    if(!currentUser) return;
    const test = testsData[currentTest];
    const endTime = new Date();
    
    const detailedAnswers = [];
    test.questions.forEach(q => {
        if (userAnswers[q.id]) {
            let ans = userAnswers[q.id];
            if (Array.isArray(ans)) ans = ans.join(", ");
            // Match answer code to text if applicable
            const opts = q.options || test.options;
            if (q.type !== 'text' && opts) {
                if (Array.isArray(userAnswers[q.id])) {
                    // For checkboxes, map each answer
                    ans = userAnswers[q.id].map(val => {
                        const opt = opts.find(o => o.uz === val || o.ru === val || o.val === val);
                        return opt ? (opt[currentLang] || val) : val;
                    }).join(", ");
                } else {
                    const opt = opts.find(o => o.val === userAnswers[q.id] || o.id === userAnswers[q.id]);
                    if (opt) {
                        ans = opt.text ? opt.text[currentLang] : (opt[currentLang] || userAnswers[q.id]);
                    } else if (userAnswers[q.id] === 'A') {
                        ans = currentLang === 'uz' ? 'Ha' : 'Да';
                    } else if (userAnswers[q.id] === 'B') {
                        ans = currentLang === 'uz' ? 'Aytish qiyin' : 'Трудно сказать';
                    } else if (userAnswers[q.id] === 'C') {
                        ans = currentLang === 'uz' ? "Yo'q" : 'Нет';
                    }
                }
            }
            detailedAnswers.push({
                q: q.text ? q.text[currentLang] : q[currentLang],
                a: ans
            });
        }
    });

    const data = {
        name: currentUser,
        school: currentUserSchool,
        className: currentUserClass,
        testName: test.title[currentLang],
        date: endTime.toLocaleDateString(),
        startTime: testStartTime ? testStartTime.toLocaleTimeString() : "-",
        endTime: endTime.toLocaleTimeString(),
        summary: summary,
        answers: detailedAnswers
    };
    
    let allResults = JSON.parse(localStorage.getItem('sorovnoma_results') || '[]');
    allResults.push(data);
    localStorage.setItem('sorovnoma_results', JSON.stringify(allResults));

    try {
        if (!supabaseClient) throw new Error('Supabase client not loaded');
        const { error } = await supabaseClient
            .from('sorovnoma_results')
            .insert([
                {
                    name: data.name,
                    school: data.school,
                    class_name: data.className,
                    test_name: data.testName,
                    date: data.date,
                    start_time: data.startTime,
                    end_time: data.endTime,
                    summary: data.summary,
                    answers: data.answers
                }
            ]);
        if (error) console.error("Supabase insert error:", error);
    } catch (e) {
        console.error("Supabase exception:", e);
    }
}
