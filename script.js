let data = null;


const escapeString = (string) => {
    const symbols = {
        '&': '&amp;',
        '<': '&lt:',
        '>': '&gt:'
    }
    return string.replace(/[&<>]/g, (tag) => {
        return symbols[tag] || tag;
    })
}

const createMainNewsItem = (item) => {
    return ` 
		<article class="main-article"> 
		<div class="main-article__image-container"> 
		<img class="article-img main-article__img" src="${encodeURI(item.image)}" alt="Фото новости"> 
		</div> 
		<div class="main-article__content"> 
		<span class="article-category">${escapeString(data.categories.find(({id}) => item.category_id === id).name)}</span> 
		<h2 class="main-article__title">${escapeString(item.title)}</h2> 
		<p class="main-article__text">${escapeString(item.description)}</p> 
		<span class="article-source main-article__caption">${escapeString(data.sources.find(({id}) => item.source_id === id).name)}</span> 
		</div> 
		</article> 
		`;
}


const createSmallNewsItem = (item) => {
    return ` 
		<article class="small-article"> 
		<h2 class="small-article__title">${escapeString(item.title)}</h2> 
		<span class="article-date">${escapeString(data.sources.find(({id}) => item.source_id === id).name)}</span> 
		<span class="article-source">${escapeString(new Date(item.date).toLocaleDateString('ru-RU', {
        month: 'long',
        day: 'numeric'
    }))}</span> 
		</article> 
		`;
}

const renderNews = (categoryId) => {
    const url = `https://frontend.karpovcourses.net/api/v2/ru/news/${categoryId || ''}`;
    fetch(url)
        .then(response => response.json())
        .then((responseData) => {
            data = responseData;

            const mainNews = data.items.slice(0, 3);
            const smallNews = data.items.slice(3, 12);

            const mainNewsContainer = document.querySelector('.articles__big-column');
            const smallNewsContainer = document.querySelector('.articles__small-column');

            mainNews.forEach((item) => {
                const template = document.createElement('template');
                template.innerHTML = createMainNewsItem(item);
                mainNewsContainer.appendChild(template.content);
            })

            smallNews.forEach((item) => {
                const template = document.createElement('template');
                template.innerHTML = createSmallNewsItem(item);
                smallNewsContainer.appendChild(template.content);
            })
        });

}