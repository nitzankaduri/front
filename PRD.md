# PRD — Formula 1 Constructors Hub (F1 Master-Detail)

> מסמך אפיון ותיאור מוצר לאפליקציית Master-Detail של קבוצות פורמולה 1.

## 1. Pitch
אפליקציית Web מודרנית ואינטראקטיבית לחובבי פורמולה 1, המאפשרת לחקור את קבוצות המירוץ (Constructors), לצפות בפרטי הקבוצה, בהיסטוריית הנהגים ונתוני העונה, ולשמור קבוצות מועדפות.

## 2. Who it is for
חובבי ספורט מוטורי ואוהדי Formula 1 שרוצים לחפש ולסנן קבוצות לפי שם ומדינה, לגלות נתונים היסטוריים ונהגים מובילים, ולשמור את הקבוצות האהובות עליהם לגישה מהירה.

## 3. Screens
- **Master View (רשימת קבוצות ומסך ראשי)**:
  - סרגל כותרת עליון (Header) בעיצוב עולם המרוצים (F1 dark aesthetic) עם לוגו ומונה מועדפים.
  - סרגל בקרה (Controls Bar): שדה חיפוש חי לפי שם קבוצה, תפריט סינון לפי לאום (Nationality), וכפתור סינון מהיר למועדפים.
  - רשת כרטיסיות (Constructors Grid): כרטיס לכל קבוצה הכולל שם, תגית לאום מעוצבת, כפתור מועדפים (כוכב) וסימון בחירה.
  - 3 מצבי ממשק מלאים: ספינר טעינה מונפש (Loading), מסך שגיאה עם כפתור Retry (Error), ומצב רשימה ריקה כאשר חיפוש אינו מעלה תוצאות (Empty State).
- **Detail View (תצוגת פירוט מעמיקה)**:
  - כרטיס פרופיל מורחב של הקבוצה שנבחרה.
  - פרטי זיהוי: שם מלא, לאום, קישור ישיר לערך ויקיפדיה הרשמי.
  - מידע עונתי והיסטורי: מיקום נוכחי ונקודות (במידה ופעילה בעונה השוטפת), ורשימת נהגי הקבוצה (שם, לאום ותאריך לידה) בשליפה בזמן אמת.
  - כפתור סגירה/חזרה לתצוגה מלאה.

## 4. Must-have features
1. **שליפת נתונים מ-API פתוח**: משיכת לפחות 30 קבוצות מ-Jolpica F1 API באמצעות `fetch` בתוך `useEffect`.
2. **מבנה Master-Detail מבוסס State ו-Props**: שמירת הקבוצה הנבחרת ב-State של רכיב האב והעברת המידע לרכיב Detail ייעודי.
3. **טיפול מלא בשלושת מצבי הממשק**: טעינה (Loading), שגיאה עם אפשרות ניסיון חוזר (Error & Retry), ותצוגת מידע מלאה (Success).
4. **חיפוש וסינון אינטראקטיביים**: סינון חי לפי שם קבוצה ותפריט בחירת לאום.
5. **שמירת מועדפים ב-LocalStorage**: אפשרות לסמן/להסיר קבוצות מועדפות ושמירתן בדפדפן.

## 5. Acceptance criteria
- When I open the app, I see an F1-themed header and an animated loading spinner, followed by at least 30 constructor cards.
- When I click on a constructor card, I see the detailed profile with team metadata, Wikipedia link, and driver/standings info.
- When I type a team name in the search bar or select a nationality, the list filters in real time.
- When I click the favorite star icon on a team, it persists in `localStorage` and stays marked after refreshing.
- When the network fails or endpoint is unreachable, an error message is displayed with a working "Retry" button.

## 6. Not now
- בחירת עונה ספציפית בהיסטוריה (1950–2026).
- השוואה ראש בראש (Head-to-Head) בין שתי קבוצות.
- תרשימי גרפים של קצב צבירת נקודות במירוצים.

## 7. Data
- **Master API**: `https://api.jolpi.ca/ergast/f1/constructors.json?limit=45`
- **Detail Drivers API**: `https://api.jolpi.ca/ergast/f1/constructors/{constructorId}/drivers.json?limit=8`
- **Detail Standings API**: `https://api.jolpi.ca/ergast/f1/current/constructors/{constructorId}/constructorStandings.json`
- **שדות ברשימה**: `constructorId`, `name`, `nationality`, `url`
- **שדות בפרטים**: `constructorId`, `name`, `nationality`, `url`, `drivers` (`givenName`, `familyName`, `nationality`), מיקום בטבלה ונקודות (במידה וקיימים).
