/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import classNames from 'classnames';

import React, { useEffect, useMemo, useRef, useState } from 'react';

import styles from './TreeManager.scss';
import { FavCard } from './components/FavCard/FavCard';
import { Section } from './components/Section/Section';
import { Snow } from './components/Snow';

import globalStyles from '../../assets/stylesheets/index.scss';

import { CustomCheckbox } from '@/components/CustomCheckbox';
import { ShapeStyle } from '@/components/CustomCheckbox/CustomCheckbox';
import { Header } from '@/components/Header';
import { Stack } from '@/components/Stack';
import { IToy, useToysLoader } from '@/hooks/useToysLoader';

enum ITreeStyle {
  Style1 = 'tree-style-1',
  Style2 = 'tree-style-2',
  Style3 = 'tree-style-3',
  Style4 = 'tree-style-4',
  Style5 = 'tree-style-5',
  Style6 = 'tree-style-6',
}

enum ITreeBgStyle {
  Style1 = 'tree-bg-1',
  Style2 = 'tree-bg-2',
  Style3 = 'tree-bg-3',
  Style4 = 'tree-bg-4',
  Style5 = 'tree-bg-5',
  Style6 = 'tree-bg-6',
  Style7 = 'tree-bg-7',
  Style8 = 'tree-bg-8',
  Style9 = 'tree-bg-9',
  Style10 = 'tree-bg-10',
}

interface ISettings {
  audio: boolean;
  snow: boolean;
  treeStyle: ITreeStyle;
  treeBgStyle: ITreeBgStyle;
}

const defaultSettings: ISettings = {
  audio: false,
  snow: false,
  treeStyle: ITreeStyle.Style1,
  treeBgStyle: ITreeBgStyle.Style1,
};

export const TreeManager = (): JSX.Element => {
  const [toys, setToys] = useState<IToy[]>([]);
  const [toysLoader] = useToysLoader();
  const [settings, setSettings] = useState<ISettings>(localStorage.getItem('toyManagerSettings')
    ? JSON.parse(localStorage.getItem('toyManagerSettings')!) as ISettings
    : defaultSettings
  );
  const track = useRef<HTMLAudioElement>(null);
  
  useEffect(() => {
    const pickedToys = localStorage.getItem('pickedToys');
    const parsedPickedToys = pickedToys !== null ? JSON.parse(pickedToys) as IToy[] : null;
    if(parsedPickedToys && parsedPickedToys.length !== 0) {
      setToys(parsedPickedToys);
    } else {
      toysLoader((newToys: IToy[]) => {
        setToys(newToys.filter((_, idx) => idx < 20));
      });
    }
  }, []);

  const treeStyleCards = useMemo(() => (Object.keys(ITreeStyle) as Array<keyof typeof ITreeStyle>).map(enumKey => {
    const currentEnumVal: ITreeStyle = ITreeStyle[enumKey];

    const treeStyles = currentEnumVal === settings.treeStyle
      ? classNames(styles['tree-style'], styles[currentEnumVal], styles['selected'])
      : classNames(styles['tree-style'], styles[currentEnumVal]);

    const onClick = () => {
      setSettings(prev => ({...prev, treeStyle: currentEnumVal}));
    };

    return <div key={currentEnumVal} className={treeStyles} onClick={onClick}/>;
  }), [settings.treeStyle]);

  const treeBgStyleCards = useMemo(() => (Object.keys(ITreeBgStyle) as Array<keyof typeof ITreeBgStyle>).map(enumKey => {
    const currentEnumVal: ITreeBgStyle = ITreeBgStyle[enumKey];

    const treeBgStyles = currentEnumVal === settings.treeBgStyle
      ? classNames(styles['tree-bg'], styles[currentEnumVal], styles['selected'])
      : classNames(styles['tree-bg'], styles[currentEnumVal]);

    const onClick = () => {
      setSettings(prev => ({...prev, treeBgStyle: currentEnumVal}));
    };
      
    return <div key={currentEnumVal} className={treeBgStyles} onClick={onClick}/>;
  }), [settings.treeBgStyle]);
  
  const setPlayMusic = (play: boolean) => {
    if(track.current) {
      if(play) {
        track.current.play();
      } else {
        track.current.pause();
        track.current.currentTime = 0;
      }
    }
  };

  useEffect(() => {
    localStorage.setItem('toyManagerSettings', JSON.stringify(settings));
  }, [settings]);

  return (
    <React.Fragment>
      <Header/>
      <main className={globalStyles['main']} onClick={() => setPlayMusic(settings.audio)}>
        <div className={globalStyles['blur-container']}>
          <div className={styles['wrapper']}>

            <Stack isVertical>
              <Section header="Опции">
                <CustomCheckbox
                  shapeStyle={ShapeStyle.Audio}
                  checked={settings.audio}
                  onCheckedChange={() => {
                    setPlayMusic(!settings.audio);
                    setSettings(prev => ({...prev, audio: !prev.audio}));
                  }}
                />
                <CustomCheckbox
                  shapeStyle={ShapeStyle.Snowflake}
                  checked={settings.snow}
                  onCheckedChange={() => setSettings(prev => ({...prev, snow: !prev.snow}))}
                />
                <button
                  className={styles['button']}
                  onClick={() => setSettings(() => {
                    setPlayMusic(defaultSettings.audio);
                    return defaultSettings;
                  })}
                  type='button'
                >
                  Сброс настроек
                </button>
              </Section>

              <Section header="Выберите ёлку">
                {treeStyleCards}
              </Section>

              <Section header="Выберите фон">
                {treeBgStyleCards}
              </Section>

              <Section header="Выберите гирлянду">
                Not implemented
              </Section>
            </Stack>

            <div className={classNames(styles['christmas-tree-container'], styles[settings.treeBgStyle])}>
              { settings.snow && <Snow/> }
              <div className={classNames(styles['christmas-tree'], styles[settings.treeStyle])}/>
            </div>

            <Stack isVertical>
              <Section header="Игрушки">
                { toys.map(toy => (<FavCard key={toy.num} amount={toy.amount} imageHref={toy.img}/>)) }
              </Section>

              <Section header="Вы нарядили">
                Not implemented
              </Section>
            </Stack>

          </div>
        </div>
        <audio loop ref={track} src="../../static/audio/audio.mp3"/>
      </main>
    </React.Fragment>
  );
};
