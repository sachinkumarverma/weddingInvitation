import { WeddingEvent } from '../types';

export function addToNativeCalendar(event: {
  title: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
}) {
  const start = new Date(event.startDate).toISOString().replace(/-|:|\.\d\d\d/g, '');
  const end = new Date(event.endDate).toISOString().replace(/-|:|\.\d\d\d/g, '');
  const now = new Date().toISOString().replace(/-|:|\.\d\d\d/g, '');
  const uid = `${Date.now()}@satyamharshitawedding.com`;

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Satyam Pathak & Harshita Dubey Wedding//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:Satyam & Harshita Wedding',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${now}`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${event.title}`,
    `DESCRIPTION:${event.description.replace(/\n/g, '\\n')}`,
    `LOCATION:${event.location}`,
    'STATUS:CONFIRMED',
    'BEGIN:VALARM',
    'TRIGGER:-P1D',
    'ACTION:DISPLAY',
    'DESCRIPTION:Reminder: Satyam & Harshita Wedding Tomorrow!',
    'END:VALARM',
    'BEGIN:VALARM',
    'TRIGGER:-PT2H',
    'ACTION:DISPLAY',
    'DESCRIPTION:Reminder: Wedding Ceremony in 2 Hours',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  // On Android, use the native intent system to prompt any available Calendar app
  const isAndroid = /android/i.test(navigator.userAgent || navigator.vendor || (window as any).opera);
  
  if (isAndroid) {
    const beginTime = new Date(event.startDate).getTime();
    const endTime = new Date(event.endDate).getTime();
    
    const fallbackUrl = encodeURIComponent(`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${start}/${end}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`);
    
    const intentUrl = `intent:#Intent;action=android.intent.action.INSERT;mimetype=vnd.android.cursor.item/event;S.title=${encodeURIComponent(event.title)};S.description=${encodeURIComponent(event.description)};S.eventLocation=${encodeURIComponent(event.location)};l.beginTime=${beginTime};l.endTime=${endTime};S.browser_fallback_url=${fallbackUrl};end`;
    
    window.location.href = intentUrl;
    return;
  }

  // On iOS and Desktop, the .ics file is correctly intercepted by the native Calendar app
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  const fileName = `${event.title.replace(/[^a-zA-Z0-9]/g, '_')}.ics`;
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

// Alias for convenience
export const downloadICS = addToNativeCalendar;

