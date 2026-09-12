import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import clsx from 'clsx';

import {
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	type ArticleStateType,
	type OptionType,
} from 'src/constants/articleProps';

import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	initialState: ArticleStateType;
	onApply: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	initialState,
	onApply,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [formState, setFormState] = useState<ArticleStateType>(initialState);

	const rootRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!isOpen) {
			return;
		}

		const handleOutsideClick = (event: MouseEvent) => {
			if (
				event.target instanceof Node &&
				rootRef.current &&
				!rootRef.current.contains(event.target)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleOutsideClick);

		return () => {
			document.removeEventListener('mousedown', handleOutsideClick);
		};
	}, [isOpen]);

	const handleToggle = () => {
		setIsOpen((state) => !state);
	};

	const handleChange = (key: keyof ArticleStateType, value: OptionType) => {
		setFormState((state) => ({
			...state,
			[key]: value,
		}));
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onApply(formState);
	};

	const handleReset = () => {
		setFormState(defaultArticleState);
		onApply(defaultArticleState);
	};

	return (
		<div ref={rootRef}>
			<ArrowButton isOpen={isOpen} onClick={handleToggle} />

			<aside
				className={clsx(styles.container, isOpen && styles.container_open)}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Select
						title='Шрифт'
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(option) => handleChange('fontFamilyOption', option)}
					/>

					<Separator />

					<RadioGroup
						name='fontSize'
						title='Размер шрифта'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={(option) => handleChange('fontSizeOption', option)}
					/>

					<Separator />

					<Select
						title='Цвет текста'
						selected={formState.fontColor}
						options={fontColors}
						onChange={(option) => handleChange('fontColor', option)}
					/>

					<Separator />

					<Select
						title='Цвет фона'
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={(option) => handleChange('backgroundColor', option)}
					/>

					<Separator />

					<RadioGroup
						name='contentWidth'
						title='Ширина контента'
						options={contentWidthArr}
						selected={formState.contentWidth}
						onChange={(option) => handleChange('contentWidth', option)}
					/>

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleReset}
						/>

						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
