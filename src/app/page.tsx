'use client';

import React from 'react';

import { Banner, NavBar } from '@/components';

import styles from './Homepage.module.scss';

export default function HomePage() {
  return (
    <div className={styles['homepage-container']}>
      <div className={styles['banner-background']} />

      <div className={styles['blur-top']} >
         <NavBar />
      </div>
  

      <div className={styles['homepage-content']}>
       
        <Banner />
      </div>
    </div>
  );
}
