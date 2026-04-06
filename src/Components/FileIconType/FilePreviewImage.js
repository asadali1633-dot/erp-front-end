import React from 'react';
import style from './image.module.css';
import pdfImg from '../../assests/images/icons/pdf.png';
import excelImg from '../../assests/images/icons/excel.png';
import docsImg from '../../assests/images/icons/word.png';
import txtImg from '../../assests/images/icons/docs.png';
import zipImg from '../../assests/images/icons/zip.png';
import rarImg from '../../assests/images/icons/rar.png';
import gifImg from '../../assests/images/icons/gif.png';
import jpgImg from '../../assests/images/icons/jpg.png';
import pngImg from '../../assests/images/icons/png.png';
import defaulImg from '../../assests/images/icons/default.png';

const fileTypeImages = {
  pdf: pdfImg,
  xls: excelImg,
  xlsx: excelImg,
  doc: docsImg,
  docx: docsImg,
  txt: txtImg,
  zip: zipImg,
  rar: rarImg,
  gif: gifImg,
  png: pngImg,
  jpg: jpgImg,
  jpeg: jpgImg,
  default: defaulImg,
};

const FilePreviewImage = ({ filePath, altText }) => {
  if (!filePath) return null;

  const ext = filePath.split('.').pop()?.toLowerCase();
  const isImage = ['jpg', 'jpeg', 'png', 'gif'].includes(ext);

  const imageSrc = fileTypeImages[ext] || fileTypeImages.default;
    return (
      <img
        src={imageSrc}
        alt={ext || 'file'}
        className={style.image}
      />
    );
};

export default FilePreviewImage;