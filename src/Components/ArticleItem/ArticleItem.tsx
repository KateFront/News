import React, {FC} from "react";
import {RelatedSmallArticle} from "../RelatedSmallArticle/RelatedSmallArticle";
import {SingleLineTitleArticle} from "../SingleLineTitleArticle/SingleLineTitleArticle";
import {Article, ArticleItemAPI, Category, RelatedArticlesAPI, Source} from "../../types";
import './ArticleItem.css';
import {beautifyDate} from "../../utils";


interface Props {
    id: number;
    categories: Category[];
    sources: Source[];
}

export const ArticleItem: FC<Props> = ({id, sources, categories}) => {

    const [articleItem, setArticleItem] = React.useState<ArticleItemAPI | null>(null);
    const [relatedArticles, setRelatedArticles] = React.useState<Article[] | null>(null);

    React.useEffect(() => {
        const url = (`https://frontend.karpovcourses.net/api/v2/ru/news/full/${id}`);
        fetch(url)
            .then(response => response.json())
            .then(setArticleItem)
        fetch(`https://frontend.karpovcourses.net/api/v2/news/related/${id}?count=9`)
            .then(response => response.json())
            .then((response: RelatedArticlesAPI) => {
                setRelatedArticles(response.items)
            })
    }, [id])

    if (articleItem === null || relatedArticles === null) {
        return null;
    }


    return (
        <section className="article-page">
            <article className="article">
                {articleItem.image.length ? (<section className="article__hero"
                                                      style={{backgroundImage: `url(${articleItem.image})`}}>
                    <div className="container article__hero-content">
                        <div className="grid">
                            <h1 className="article__hero-title">{articleItem.title}</h1>
                        </div>

                        <div className="grid">
                            <span className="article-category article__category">{articleItem.category.name}</span>
                            <span className="article-date article__date">{beautifyDate(articleItem.date)}</span>
                        </div>
                    </div>
                </section>) : null}


                <div className="grid container article__main">
                    <div className="article__content">
                        {articleItem.image.length && (<div className="article__title-container">
                            <h1 className="article__title">{articleItem.title}</h1>

                            <div className="grid">
                                <span className="article-category article__category">{articleItem.category.name}</span>
                                <span className="article-date article__date">{beautifyDate(articleItem.date)}</span>
                            </div>
                        </div>)}


                        <p>{articleItem.text}</p>
                        {/*<p>Наши баскетболистки прекрасно шли по дистанции, но в решающий момент сплоховали.</p>
                        <img src="http://placeimg.com/1000/500/any"/>
                        <p>Победа США получилась слишком лёгкой. Американки с самого начала захватили инициативу и не
                            давали России ни малейшего шанса совершить камбэк. Появилась хоть призрачная надежда на
                            спасение, но американки сразу же попали из-за дуги и фактически сняли все вопросы — шансов
                            отыграться при 12:17 не было.</p>
                        <img src="http://placeimg.com/1000/500/any"/>*/}
                    </div>

                    <div className="article__small-column">

                        {relatedArticles.slice(3, 9).map((item) => {
                            const category = categories.find(({id}) => item.category_id === id);
                            const source = sources.find(({id}) => item.source_id === id);
                            return (
                                <RelatedSmallArticle key={item.id}
                                                     title={item.title}
                                                     source={source?.name || ''}
                                                     category={category?.name || ''}
                                                     image={item.image}
                                />
                            )
                        })}
                    </div>
                </div>
            </article>

            <section className="article-page__related-articles">
                <div className="container">
                    <h2 className="article-page__related-articles-title">Читайте также:</h2>

                    <div className="grid article-page__related-articles-list">
                        {relatedArticles.slice(0.3).map((item) => {
                            const category = categories.find(({id}) => item.category_id === id);
                            const source = sources.find(({id}) => item.source_id === id);
                            return (
                                <SingleLineTitleArticle key={item.id}
                                                        title={item.title}
                                                        source={source?.name || ''}
                                                        category={category?.name || ''}
                                                        image={item.image}
                                                        text={item.description}/>
                            )
                        })}
                    </div>
                </div>
            </section>
        </section>
    );
};