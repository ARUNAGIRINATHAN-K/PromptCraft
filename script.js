document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('prompt-form');
    const promptText = document.getElementById('prompt-text');
    const copyBtn = document.getElementById('copy-btn');
    const themeToggle = document.getElementById('theme-toggle');

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
    });

    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark');
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const taskType = document.getElementById('task-type').value;
        const topic = document.getElementById('topic').value;
        const tone = document.getElementById('tone').value;
        const length = document.getElementById('length').value;
        const constraints = document.getElementById('constraints').value;

        if (!taskType || !topic || !tone || !length) {
            promptText.textContent = 'Please fill out all required fields.';
            copyBtn.disabled = true;
            return;
        }
        const templates = {
            'Creative Writing': `Write a ${length} ${taskType.toLowerCase()} piece about ${topic} with a ${tone.toLowerCase()} tone${constraints ? `, incorporating ${constraints}` : ''}.`,
            'Coding': `Write a ${length} ${taskType.toLowerCase()} script in ${topic} that performs the following task${constraints ? `: ${constraints}` : ''}.`,
            'Brainstorming': `Generate ${length} ideas for ${topic} in a ${tone.toLowerCase()} style${constraints ? `, considering ${constraints}` : ''}.`
        };

        const prompt = templates[taskType] || `Write a ${length} piece about ${topic} with a ${tone.toLowerCase()} tone${constraints ? `, incorporating ${constraints}` : ''}.`;
        promptText.textContent = prompt;
        copyBtn.disabled = false;
    });

    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(promptText.textContent).then(() => {
            alert('Prompt copied to clipboard!');
        }).catch(() => {
            alert('Failed to copy prompt.');
        });
    });
});