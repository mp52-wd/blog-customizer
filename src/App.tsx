import { useState } from 'react';
import clsx from 'clsx';
import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState, ArticleStateType } from './constants/articleProps';
import './styles/index.scss';
import styles from './styles/index.module.scss';

const App = () => {
  const [articleState, setArticleState] = useState<ArticleStateType>(defaultArticleState);

  // Функция для применения стилей через state
  const applyStyles = (state: ArticleStateType) => {
    setArticleState(state);
  };

  return (
    <main
      className={clsx(styles.main)}
      style={{
        '--font-family': articleState.fontFamilyOption.value,
        '--font-size': articleState.fontSizeOption.value,
        '--font-color': articleState.fontColor.value,
        '--container-width': articleState.contentWidth.value,
        '--bg-color': articleState.backgroundColor.value,
      } as React.CSSProperties}
    >
      <ArticleParamsForm applyStyles={applyStyles} articleState={articleState} />
      <Article />
    </main>
  );
};

export default App;
