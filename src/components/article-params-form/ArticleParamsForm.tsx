import { useState, useRef, useEffect } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Text } from 'src/ui/text';
import {
  fontFamilyOptions,
  fontColors,
  backgroundColors,
  contentWidthArr,
  fontSizeOptions,
  defaultArticleState,
  OptionType,
  ArticleStateType,
} from 'src/constants/articleProps';
import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';

// Добавляем типы пропсов
interface ArticleParamsFormProps {
  applyStyles: (state: ArticleStateType) => void;
  articleState: ArticleStateType;
}

export const ArticleParamsForm = ({ applyStyles, articleState }: ArticleParamsFormProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const asideRef = useRef<HTMLDivElement>(null);

  // Независимое состояние формы
  const [formState, setFormState] = useState<ArticleStateType>(articleState);
  // Состояние применённых настроек (для сброса)
  const [appliedState, setAppliedState] = useState<ArticleStateType>(articleState);

  // Закрытие по клику вне aside
  useEffect(() => {
    if (!isMenuOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (asideRef.current && !asideRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  // Применить
  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setAppliedState(formState);
    applyStyles(formState);
    setIsMenuOpen(false);
  };

  // Сбросить
  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState(defaultArticleState);
    setAppliedState(defaultArticleState);
    applyStyles(defaultArticleState);
    // Не закрываем сайдбар, чтобы пользователь видел результат
  };

  // Открытие панели — сбрасываем форму к применённым настройкам
  useEffect(() => {
    if (isMenuOpen) {
      setFormState(appliedState);
    }
  }, [isMenuOpen, appliedState]);

  return (
    <>
      <ArrowButton isOpen={isMenuOpen} onClick={() => setIsMenuOpen((prev) => !prev)} />
      <aside
        ref={asideRef}
        className={clsx(styles.container, { [styles.container_open]: isMenuOpen })}
      >
        <form className={styles.form} onSubmit={handleApply} onReset={handleReset}>
          <div style={{ marginBottom: 24 }}>
            <Text size={18} weight={800} as="h2">
              Настройки статьи
            </Text>
          </div>
          <Select
            title="Шрифт"
            options={fontFamilyOptions}
            selected={formState.fontFamilyOption}
            onChange={(option) => setFormState((s) => ({ ...s, fontFamilyOption: option }))}
          />
          <Select
            title="Цвет шрифта"
            options={fontColors}
            selected={formState.fontColor}
            onChange={(option) => setFormState((s) => ({ ...s, fontColor: option }))}
          />
          <Select
            title="Цвет фона"
            options={backgroundColors}
            selected={formState.backgroundColor}
            onChange={(option) => setFormState((s) => ({ ...s, backgroundColor: option }))}
          />
          <RadioGroup
            name="contentWidth"
            title="Ширина контейнера"
            options={contentWidthArr}
            selected={formState.contentWidth}
            onChange={(option) => setFormState((s) => ({ ...s, contentWidth: option }))}
          />
          <RadioGroup
            name="fontSizeOption"
            title="Размер шрифта"
            options={fontSizeOptions}
            selected={formState.fontSizeOption}
            onChange={(option) => setFormState((s) => ({ ...s, fontSizeOption: option }))}
          />
          <div className={styles.bottomContainer}>
            <Button title='Сбросить' htmlType='reset' type='clear' />
            <Button title='Применить' htmlType='submit' type='apply' />
          </div>
        </form>
      </aside>
    </>
  );
};
