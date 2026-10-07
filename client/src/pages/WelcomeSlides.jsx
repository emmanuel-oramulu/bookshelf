import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './WelcomeSlides.module.css';

const slides = [
  {
    emoji: '📚',
    title: 'Your Reading Life, Organized',
    description: 'Keep track of every book you have read, are reading, or want to read. All in one place.',
  },
  {
    emoji: '📊',
    title: 'Track Your Progress',
    description: 'See your reading stats, streaks, and how far you have come. Stay motivated every day.',
  },
  {
    emoji: '☁️',
    title: 'Sync Across Devices',
    description: 'Your library lives in the cloud. Pick up right where you left off on any device.',
  },
];

function WelcomeSlides () {
  
}