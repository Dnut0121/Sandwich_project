import React, { useMemo, useState } from "react";

// 샌드위치 재료 데이터
const INGREDIENTS = [
  { id: "bread", name: "빵", color: "#D4A574", emoji: "🍞" },
  { id: "lettuce", name: "상추", color: "#90EE90", emoji: "🥬" },
  { id: "tomato", name: "토마토", color: "#FF6347", emoji: "🍅" },
  { id: "cheese", name: "치즈", color: "#FFD700", emoji: "🧀" },
  { id: "ham", name: "햄", color: "#FFB6C1", emoji: "🍖" },
  { id: "bacon", name: "베이컨", color: "#8B4513", emoji: "🥓" },
  { id: "onion", name: "양파", color: "#F0E68C", emoji: "🧅" },
  { id: "cucumber", name: "오이", color: "#32CD32", emoji: "🥒" },
  { id: "pickle", name: "피클", color: "#9ACD32", emoji: "🥒" },
  { id: "avocado", name: "아보카도", color: "#228B22", emoji: "🥑" },
  { id: "egg", name: "계란", color: "#FFE4B5", emoji: "🥚" },
  { id: "tuna", name: "참치", color: "#4682B4", emoji: "🐟" },
  { id: "chicken", name: "치킨", color: "#DEB887", emoji: "🍗" },
  { id: "sauce", name: "소스", color: "#FFA500", emoji: "🍯" },
];

function IngredientButton({ ingredient, onClick }: { ingredient: any; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: ingredient.color,
        border: '2px solid #ddd',
        borderRadius: '8px',
        padding: '8px',
        margin: '4px',
        cursor: 'pointer',
        fontSize: '20px',
        minWidth: '80px',
        height: '60px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.2s ease'
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = 'scale(1.05)';
        e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <span style={{ fontSize: '24px', marginBottom: '4px' }}>{ingredient.emoji}</span>
      <span style={{ fontSize: '12px', fontWeight: 'bold' }}>{ingredient.name}</span>
    </button>
  );
}

function SandwichLayer({ ingredient, index, onRemove }: { ingredient: any; index: number; onRemove: (index: number) => void }) {
  const layerStyle = {
    position: 'absolute' as const,
    left: '50%',
    transform: 'translateX(-50%)',
    bottom: `${20 + index * 25}px`,
    width: '200px',
    height: '20px',
    backgroundColor: ingredient.color,
    border: '2px solid #333',
    borderRadius: '10px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#333',
    transition: 'all 0.2s ease'
  };

  return (
    <div
      style={layerStyle}
      onClick={() => onRemove(index)}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = 'translateX(-50%) scale(1.05)';
        e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.3)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = 'translateX(-50%) scale(1)';
        e.currentTarget.style.boxShadow = 'none';
      }}
      title="클릭하여 제거"
    >
      {ingredient.emoji} {ingredient.name}
    </div>
  );
}

export default function SandwichMaker() {
  const [sandwich, setSandwich] = useState<any[]>([]);
  const [history, setHistory] = useState<any[][]>([]);

  const canUndo = history.length > 0;

  const saveState = () => {
    setHistory([...history, [...sandwich]]);
  };

  const addIngredient = (ingredient: any) => {
    saveState();
    setSandwich([...sandwich, ingredient]);
  };

  const removeIngredient = (index: number) => {
    saveState();
    setSandwich(sandwich.filter((_, i) => i !== index));
  };

  const undo = () => {
    if (canUndo) {
      const previousState = history[history.length - 1];
      setHistory(history.slice(0, -1));
      setSandwich(previousState);
    }
  };

  const reset = () => {
    saveState();
    setSandwich([]);
  };

  const randomSandwich = () => {
    saveState();
    const numIngredients = Math.floor(Math.random() * 5) + 3; // 3-7개
    const randomIngredients = Array.from({ length: numIngredients }, () => 
      INGREDIENTS[Math.floor(Math.random() * INGREDIENTS.length)]
    );
    setSandwich(randomIngredients);
  };

  const ingredientCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    sandwich.forEach(ingredient => {
      counts[ingredient.id] = (counts[ingredient.id] || 0) + 1;
    });
    return counts;
  }, [sandwich]);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      fontFamily: 'Arial, sans-serif',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        backgroundColor: 'white',
        borderRadius: '20px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
        overflow: 'hidden'
      }}>
        {/* 헤더 */}
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          padding: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h1 style={{ margin: 0, fontSize: '28px', fontWeight: 'bold' }}>🥪 샌드위치 만들기</h1>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={undo}
              disabled={!canUndo}
              style={{
                padding: '8px 16px',
                border: 'none',
                borderRadius: '20px',
                backgroundColor: canUndo ? '#4CAF50' : '#ccc',
                color: 'white',
                cursor: canUndo ? 'pointer' : 'not-allowed',
                fontSize: '14px',
                fontWeight: 'bold'
              }}
            >
              되돌리기
            </button>
            <button
              onClick={reset}
              style={{
                padding: '8px 16px',
                border: 'none',
                borderRadius: '20px',
                backgroundColor: '#FF9800',
                color: 'white',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 'bold'
              }}
            >
              초기화
            </button>
            <button
              onClick={randomSandwich}
              style={{
                padding: '8px 16px',
                border: 'none',
                borderRadius: '20px',
                backgroundColor: '#9C27B0',
                color: 'white',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 'bold'
              }}
            >
              랜덤
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', minHeight: '600px' }}>
          {/* 왼쪽: 냉장고 */}
          <div style={{
            width: '300px',
            backgroundColor: '#f8f9fa',
            padding: '20px',
            borderRight: '2px solid #e9ecef'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
              <span style={{ fontSize: '24px', marginRight: '10px' }}>🧊</span>
              <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 'bold', color: '#333' }}>냉장고</h2>
            </div>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              maxHeight: '500px',
              overflowY: 'auto'
            }}>
              {INGREDIENTS.map((ingredient) => (
                <IngredientButton
                  key={ingredient.id}
                  ingredient={ingredient}
                  onClick={() => addIngredient(ingredient)}
                />
              ))}
            </div>
          </div>

          {/* 중앙: 샌드위치 */}
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px',
            backgroundColor: '#fafafa'
          }}>
            <div style={{
              position: 'relative',
              width: '300px',
              height: '400px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {/* 접시 */}
              <div style={{
                position: 'absolute',
                bottom: '0',
                width: '250px',
                height: '40px',
                backgroundColor: '#e0e0e0',
                borderRadius: '20px',
                border: '3px solid #bdbdbd'
              }} />
              
              {/* 샌드위치 레이어들 */}
              {sandwich.length === 0 ? (
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  color: '#999',
                  fontSize: '16px',
                  textAlign: 'center'
                }}>
                  왼쪽에서 재료를 선택해주세요
                </div>
              ) : (
                sandwich.map((ingredient, index) => (
                  <SandwichLayer
                    key={`${ingredient.id}-${index}`}
                    ingredient={ingredient}
                    index={index}
                    onRemove={removeIngredient}
                  />
                ))
              )}
            </div>
          </div>

          {/* 오른쪽: 요약 */}
          <div style={{
            width: '300px',
            backgroundColor: '#f8f9fa',
            padding: '20px',
            borderLeft: '2px solid #e9ecef'
          }}>
            <h2 style={{ margin: '0 0 20px 0', fontSize: '20px', fontWeight: 'bold', color: '#333' }}>
              구성 요약
            </h2>
            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {Object.keys(ingredientCounts).length === 0 ? (
                <p style={{ color: '#999', fontSize: '14px' }}>재료를 추가하면 목록이 표시됩니다.</p>
              ) : (
                <div>
                  {Object.entries(ingredientCounts).map(([id, count]) => {
                    const ingredient = INGREDIENTS.find(ing => ing.id === id);
                    if (!ingredient) return null;
                    return (
                      <div key={id} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '8px 0',
                        borderBottom: '1px solid #eee'
                      }}>
                        <span style={{ display: 'flex', alignItems: 'center', fontSize: '16px' }}>
                          <span style={{ marginRight: '8px', fontSize: '20px' }}>{ingredient.emoji}</span>
                          {ingredient.name}
                        </span>
                        <span style={{ color: '#666', fontWeight: 'bold' }}>×{count}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <div style={{
              marginTop: '20px',
              padding: '10px',
              backgroundColor: '#e3f2fd',
              borderRadius: '8px',
              fontSize: '12px',
              color: '#1976d2'
            }}>
              💡 팁: 샌드위치 레이어를 클릭하면 제거됩니다
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
