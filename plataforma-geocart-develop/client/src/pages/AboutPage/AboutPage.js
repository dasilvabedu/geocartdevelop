import React from 'react';

import Button from '@material-ui/core/Button';
import DescriptionIcon from '@material-ui/icons/Description';
import ImageIcon from '@material-ui/icons/Image';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';

import BasePage from '../../layout/BasePage';

import styles from './AboutPage.module.css';

const sampleFiles = [
  {
    type: 'doc',
    description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
    url: 'https://www.google.com'
  },
  {
    type: 'image',
    description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
    url: 'https://www.google.com'
  },
  {
    type: 'video',
    description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
    url: 'https://www.google.com'
  },
];

export default function AboutPage() {
  const getIconByFileType = (fileType) => {
    const mapFileTypeToIcon = {
      doc: DescriptionIcon,
      image: ImageIcon,
      video: PlayCircleFilledIcon,
    };

    return mapFileTypeToIcon[fileType] || DescriptionIcon;
  };

  const getColorByFileType = (fileType) => {
    const mapFileTypeToColor = {
      doc: '#636466',
      image: '#6EBE44',
      video: '#F59721',
    };

    return mapFileTypeToColor[fileType] || '#636466';
  };

  return (
    <BasePage>
      <main className={ styles.container }>
        <h1>O que é o PAE?</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <ul className={ styles.fileList }>
          { sampleFiles.map((file) => {
            const IconComponent = getIconByFileType(file.type);

            return (
              <li key={ `file-${ file.url }` } className={ styles.fileItem }>
                <div className={ styles.fileItemHeader }>
                  <IconComponent className={ styles.fileItemIcon } style={ { color: getColorByFileType(file.type) } } />
                  <div className={ styles.fileItemContent }>
                    <p className={ styles.fileItemDescription }>{ file.description }</p>
                    <Button variant="contained" color="primary" href={ file.url } target="_blank">Visualizar</Button>
                  </div>
                </div>
              </li>
            );
          }) }
        </ul>
      </main>
    </BasePage>
  )
}
