import React, { useState } from 'react';
import Explorer from './Explorer';

type Props = {};

function Bin({}: Props) {
  const [files, setFiles] = useState<string[]>([
    'old_report.docx',
    'image.png',
    'notes.txt',
  ]);
  const [isEmpty, setIsEmpty] = useState(false);

  const emptyBin = () => {
    setFiles([]);
    setIsEmpty(true);
  };

  return <Explorer defaultFolderName='Recycle Bin' />;
}

export default Bin;
