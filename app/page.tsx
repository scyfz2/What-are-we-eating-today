"use client";

import React, { useState } from "react";

const initialData = [
  "香菇滑鸡", "辣炒牛肉", "西葫芦炒蛋", "地锅鸡", "可乐鸡翅", "红烧肉",
  "芹菜牛肉", "麻婆豆腐", "黄焖鸡", "羊肉抓饭", "清炖羊肉", "肉沫茄子",
  "干锅花菜", "辣椒炒肉", "豆角焖面", "茶叶蛋", "红烧猪脚", "凉拌西红柿",
  "炒黄瓜", "红烧牛腩", "椒盐鸡翅", "咖喱鸡", "咖喱牛", "风味茄子",
  "脆脆土豆牛肉", "花卷", "麻辣香锅", "双椒鸡丁", "芝士焗红薯", "土豆炖牛肉",
  "番茄牛腩", "酸辣土豆丝", "炒豆芽", "糖醋排骨", "炒面", "水蒸蛋",
  "椒盐排骨", "糖醋藕", "菠萝炒牛肉", "老式拌饭", "炒年糕", "养生鸡汤",
  "香煎豆腐", "豆芽炒牛肉", "番茄鸡蛋", "洋葱炒蛋", "萝卜炖排骨", "黄豆排骨",
  "芙蓉鲜蔬汤", "叉烧", "南瓜肉", "卤牛肉"
];

export default function SlotMachine() {
  const [results, setResults] = useState(["今天", "我要", "吃什么"]);
  const [isRolling, setIsRolling] = useState([false, false, false]);
  const [data, setData] = useState(initialData); // 用于管理菜谱列表
  const [newDish, setNewDish] = useState(""); // 管理新添加菜品的输入值

  const handleSpinClick = () => {
    const intervals = [];
    const newResults = [];
    setIsRolling([true, true, true]);

    for (let i = 0; i < 3; i++) {
      intervals[i] = setInterval(() => {
        newResults[i] = data[Math.floor(Math.random() * data.length)];
        setResults([...newResults]);
      }, 100);

      setTimeout(() => {
        clearInterval(intervals[i]);
        setIsRolling((prev) => {
          const newRollingState = [...prev];
          newRollingState[i] = false;
          return newRollingState;
        });
      }, 1000 + i * 500);
    }
  };

  // 增加菜品
  const handleAddDish = () => {
    if (newDish.trim()) {
      setData((prevData) => [...prevData, newDish.trim()]);
      setNewDish(""); // 清空输入框
    }
  };

  // 删除菜品
  const handleDeleteDish = (index) => {
    setData((prevData) => prevData.filter((_, i) => i !== index));
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen p-8"
      style={{
        backgroundImage: "url('/bg.jpg')",
        backgroundSize: "auto", // 不拉伸
        backgroundRepeat: "repeat", // 重复铺满
        backgroundPosition: "center", // 居中对齐每个图块
      }}
    >
      <h1 className="text-4xl font-bold mt-16 mb-8 text-white">老虎机抽奖</h1>
      
      {/* 老虎机容器 */}
      <div className="flex justify-center items-center border-4 border-whtie rounded-xl p-1 bg-whtie shadow-lg">
        {results.map((result, index) => (
          <div
            key={index}
            className={`w-24 h-24 flex items-center justify-center rounded-lg m-2 text-1.2xl font-bold text-white transition-all duration-500 ease-out transform ${
              isRolling[index] ? "blur-md scale-105" : ""
            } bg-gradient-to-br from-yellow-400 to-red-500`}
          >
            {result || "?"}
          </div>
        ))}
      </div>

      {/* 抽奖按钮 */}
      <button
        onClick={handleSpinClick}
        className="mt-10 px-8 py-4 rounded-full text-lg font-semibold shadow-lg transition-all duration-300 ease-in-out bg-green-500 text-white hover:bg-green-600"
      >
        开始抽奖
      </button>

      {/* 新增菜品输入框和按钮 */}
      <div className="mt-8 w-full max-w-md flex items-center space-x-2">
        <input
          type="text"
          placeholder="添加新的菜品"
          value={newDish}
          onChange={(e) => setNewDish(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-100 focus:border-blue-200 focus:ring-1 focus:ring-blue-200 shadow-sm transition duration-200 ease-in-out"
        />
        <button
          onClick={handleAddDish}
          className="px-6 py-4 whitespace-nowrap bg-blue-300 text-white rounded-lg font-semibold hover:bg-blue-500 active:scale-95 transform transition duration-150 ease-in-out shadow-md"
        >
          增加菜品
        </button>
      </div>

      {/* 菜谱列表 */}
      <div className="mt-12 w-full max-w-4xl bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">菜谱列表</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {data.map((item, index) => (
            <div
              key={index}
              className="relative bg-gray-100 p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-300"
            >
              <p className="text-gray-800 text-center font-semibold">{item}</p>
              <button
                onClick={() => handleDeleteDish(index)}
                className="absolute top-1 right-1 text-red-500 hover:text-red-700"
                title="删除菜品"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
