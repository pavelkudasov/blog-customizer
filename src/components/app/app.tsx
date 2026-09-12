import { useState } from 'react';
import type { CSSProperties } from 'react';
import clsx from 'clsx';

import { defaultArticleState } from 'src/constants/articleProps';

import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';

import styles from './app.module.scss';

export const App = () => {
	const [articleState, setArticleState] = useState(defaultArticleState);

	const handleApply = (state: typeof defaultArticleState) => {
		setArticleState(state);
	};

	const style = {
		'--font-family': articleState.fontFamilyOption.value,
		'--font-size': articleState.fontSizeOption.value,
		'--font-color': articleState.fontColor.value,
		'--container-width': articleState.contentWidth.value,
		'--bg-color': articleState.backgroundColor.value,
	} as CSSProperties;

	return (
		<main className={clsx(styles.main)} style={style}>
			<ArticleParamsForm initialState={articleState} onApply={handleApply} />
			<Article />
		</main>
	);
};
