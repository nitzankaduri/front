# Formula 1 Constructors Hub · Grand Prix Racing Teams Explorer

אפליקציית Web מודרנית ואינטראקטיבית ב-React 19 + Vite לחובבי פורמולה 1 (F1), המאפשרת לחקור קבוצות מרוץ (Constructors), לצפות בפרופיל מעמיק של כל קבוצה (Master-Detail), בנהגים פעילים והיסטוריים, בנתוני אליפות שוטפים וקישורים לערכי ויקיפדיה, ולשמור קבוצות מועדפות בדפדפן.

---

## 🚀 התחלה מהירה

```bash
# שכפול הפרויקט
git clone https://github.com/nitzankaduri/front.git
cd front

# התקנת תלויות
npm install

# הפעלת שרת הפיתוח
npm run dev
```

פתחו את הדפדפן בכתובת המקומית (ברירת מחדל: `http://localhost:5173`).

לבדיקת ייצור (Production Build) ובדיקת תקינות מלאה:
```bash
npm run build
npm run lint
```

---

## 🛠️ ארכיטקטורה וטכנולוגיות

- **Pure Client-Side React 19 + Vite**: ללא שרת Node/Express backend, ללא Next.js, ללא Redux, ללא ספריות UI כבדות (MUI/AntD/Bootstrap).
- **Custom F1 Racing Design System**: עיצוב CSS מותאם אישית ב-`src/index.css` עם Glass-morphism, ערכת צבעי מרוצים (F1 Dark & Neon Red), ורספונסיביות מלאה למובייל ודסקטופ.
- **External Public API**: נתונים נשלפים מ-**Jolpica F1 API** (Ergast-compatible REST API פתוח עם תמיכת CORS מלאה):
  - `https://api.jolpi.ca/ergast/f1/constructors.json?limit=45`
  - `https://api.jolpi.ca/ergast/f1/constructors/{id}/drivers.json?limit=8`
  - `https://api.jolpi.ca/ergast/f1/current/constructors/{id}/constructorStandings.json`
- **Visual Assets & Images**: סמלי קבוצות רשמיים, תמונות רכבי מרוץ (Livery Cars), דגלי מדינות לכל לאום (FlagCDN), ומנגנוני fallback איתנים (`onError`).

---

## 🧩 מבנה רכיבים (`src/components/`)

האפליקציה מחולקת לרכיבים ייעודיים ועצמאיים עם הפרדת אחריות מלאה:

1. **`Header.jsx`**: סרגל ניווט ומיתוג F1 עליון, מחוון עונה שוטפת, ומונה מועדפים אינטראקטיבי לסינון מהיר.
2. **`ConstructorList.jsx`**: רשת (Grid) המרנדרת את כל כרטיסי הקבוצות עם מפתחות ייחודיים ויציבים (`key={item.constructorId}`).
3. **`ConstructorCard.jsx`**: כרטיס קבוצה עם לוגו רשמי, דגל לאום, קוד זיהוי, כפתור מועדפים (כוכב) וסימון בחירה.
4. **`ConstructorDetail.jsx`**: תצוגת פירוט מועשרת (Detail View) עם תמונת רכב, קישור ויקיפדיה, שליפה חיה של נהגי הקבוצה וטבלת עונה.
5. **`SearchBar.jsx`**: שדה חיפוש חי לפי שם קבוצה, סינון לפי לאום (Nationality), כפתור "מועדפים בלבד", וכפתור איפוס.
6. **`LoadingSpinner.jsx`**: ספינר טכומטר F1 מונפש למצב טעינת נתונים (Loading State).
7. **`ErrorMessage.jsx`**: התראת שגיאת תקשורת עם כפתור ניסיון חוזר (Error & Retry State).
8. **`EmptyState.jsx`**: מצב רשימה ריקה כאשר חיפוש או סינון אינם מעלים תוצאות (Empty State).

---

## ⚡ שלושת מצבי המסך (Screen States)

- **טעינה (Loading State)**: מוצגת אנימציית טכומטר מרוצים ואינדיקטור טלמטריה בזמן שליפת נתונים.
- **תוכן (Content State)**: גריד עשיר של עשרות קבוצות F1 לצד חלונית פירוט מפורטת ואינטראקטיבית.
- **שגיאה / ריק (Error & Empty State)**: הודעה ידידותית עם כפתור Retry במקרה של כשל רשת, ומסך ייעודי לאיפוס סינון כאשר החיפוש ריק.

---

## 💾 שמירה ב-LocalStorage

סימון קבוצה כמועדפת (לחיצה על הכוכב) נשמר באופן מיידי ב-`localStorage`, מתעדכן במונה הראשי, נשמר ברענון דף ומאפשר סינון מהיר של קבוצות אהובות בלבד.
