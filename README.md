## 🧠 專案簡介（Overview）

這是一個以 **HTML5 Canvas** 製作的經典「貪食蛇」遊戲，  
使用純 JavaScript 實作邏輯與繪圖，搭配 localStorage 紀錄最高分數。  

玩家可使用方向鍵控制蛇移動、吃果實得分，  
遊戲結束後可按「重新開始」重玩。

---

## ⚙️ 使用技術（Tech Stack）

| 類別 | 技術 |
|------|------|
| 前端標記 | HTML5 |
| 畫面設計 | CSS3 |
| 遊戲邏輯 | 原生 JavaScript |
| 繪圖技術 | HTML Canvas API |
| 資料儲存 | localStorage |

---

## 🎮 遊戲規則（Game Rules）

1. 使用方向鍵控制蛇的移動方向。  
2. 每吃到一顆果實可獲得 1 分，蛇身會變長。  
3. 若蛇咬到自己，遊戲結束。  
4. 可穿越邊界（出右邊會從左邊出現）。  
5. 最高分會自動儲存在瀏覽器 localStorage。

---

## 🌟 功能特色（Features）

- 🧩 **Canvas 動態繪圖**  
  以 `requestAnimationFrame` 方式（此版本用 `setInterval`）進行遊戲刷新。  

- 🍇 **隨機生成果實位置**  
  果實不會生成在蛇身上。  

- 🧮 **即時分數統計**  
  畫面下方即時顯示目前分數與最高分數。  

- 💾 **localStorage 最高分紀錄**  
  自動儲存遊玩紀錄，即使重新整理頁面也會保留最高分。  

- 🎮 **重新開始功能**  
  點擊「開始新遊戲」按鈕重新載入頁面即可再次挑戰。

---

## 🧭 學習重點（What I Learned）

掌握 Canvas API 基本繪圖與重繪概念

使用 陣列管理遊戲物件狀態（snake 陣列）

學會 事件監聽與遊戲節奏控制（keydown + setInterval）

應用 localStorage 儲存遊戲數據

熟悉 碰撞偵測與隨機生成邏輯
