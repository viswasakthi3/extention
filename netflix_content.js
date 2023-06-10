const getNetflixContent = () => {
    const netflixContent = [];
    const netflixRows = document.querySelectorAll('.lolomoRow');
    netflixRows.forEach((row) => {
        const rowTitleElement = row.querySelector('.rowTitle');
        const rowTitle = rowTitleElement ? rowTitleElement.textContent.trim() : '';
        const videoElements = row.querySelectorAll('.slider-item');
        videoElements.forEach((videoElement) => {
            const videoTitleElement = videoElement.querySelector('.fallback-text');
            const videoTitle = videoTitleElement ? videoTitleElement.textContent.trim() : '';
            netflixContent.push({
                rowTitle,
                videoTitle,
            });
        });
    });
    return netflixContent;
};
