document.addEventListener('DOMContentLoaded', () => {
    const bottomSheet = new BottomSheet();

    document.querySelectorAll('[data-content]').forEach(button => {
        button.addEventListener('click', () => {
            const contentId = button.getAttribute('data-content');
            const template = document.getElementById(contentId);
            if (template) {
                const content = template.content.cloneNode(true);
                bottomSheet.setContent(content);
                bottomSheet.openSheet();
            }
        });
    });
});
