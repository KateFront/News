import Articles from "../Articles/Articles.js";
import Navigation from "../Navigation/Navigation.js";
import {categoryIds} from "../../utils.js";
import React from "react";
import './App.css';
import {Article} from "../Article/Article";


const App = () => {
    const [articleId, setArticleId] = React.useState(null);
    const [category, setCategory] = React.useState('index');
    const [articles, setArticles] = React.useState({items: [], categories: [], sources: []});

    const onNavClick = (e) => {
        e.preventDefault();
        setArticleId(null);
        setCategory(e.currentTarget.dataset.href);
    }

    const onArticleClick = (id) => {
        setArticleId(id)
    }

    React.useEffect(() => {
        const url = ('https://frontend.karpovcourses.net/api/v2/ru/news/' + categoryIds[category] || '');
        fetch(url)
            .then(response => response.json())
            .then((response) => setArticles(response))
    }, [category])

    return (
        <React.Fragment>
            <header className="header">
                <div className="container">
                    <Navigation onNavClick={onNavClick}
                                currentCategory={category}
                                className={'header__navigation'}
                                placement={'header'}
                    />

                </div>
            </header>

            <main>
                {articleId !== null
                    ? <Article/>
                    : <Articles articles={articles} onArticleClick={onArticleClick}/>
                }
            </main>

            <footer className="footer">
                <div className="container">
                    <Navigation onNavClick={onNavClick} currentCategory={category} className={'footer__navigation'}
                                placement={'footer'}/>

                    <div className="footer__column">
                        <p className="footer__text">Сделано на Frontend курсе в <a
                            href="https://karpov.courses/frontend"
                            target="_blank"
                            className="footer__link">Karpov.Courses</a></p>
                        <p className="footer__copyright">© 2021</p>
                    </div>
                </div>
            </footer>
        </React.Fragment>
    )
}
export default App;