function nextStep(step) {
    // Hide all contents
    document.getElementById('content1').classList.add('hidden');
    document.getElementById('content2').classList.add('hidden');
    document.getElementById('content3').classList.add('hidden');

    // Remove active classes from tabs
    document.getElementById('tab1').classList.remove('active');
    document.getElementById('tab2').classList.remove('active');
    document.getElementById('tab3').classList.remove('active');

    // Show current step
    document.getElementById('content' + step).classList.remove('hidden');
    const activeTab = document.getElementById('tab' + step);
    activeTab.classList.add('active');
}