import React, { useState, useEffect } from 'react';
import { 
  Package, 
  ShoppingCart, 
  Bookmark, 
  Users, 
  Plus, 
  Minus, 
  Trash2, 
  Edit3, 
  AlertTriangle, 
  CheckCircle2, 
  RefreshCw, 
  Search, 
  Home, 
  UserCheck, 
  ChefHat, 
  Clock,
  Sparkles,
  Info
} from 'lucide-react';

// Dados iniciais de demonstração
const INITIAL_PRODUCTS = [
  { id: '1', name: 'Arroz Integral 1kg', category: 'Grãos', quantity: 3, minQuantity: 2, reserved: 1, unit: 'pacote' },
  { id: '2', name: 'Leite Integral 1L', category: 'Laticínios', quantity: 1, minQuantity: 3, reserved: 0, unit: 'caixa' },
  { id: '3', name: 'Café Torrado 500g', category: 'Matinais', quantity: 0, minQuantity: 1, reserved: 0, unit: 'pacote' },
  { id: '4', name: 'Azeite de Oliva 500ml', category: 'Temperos', quantity: 2, minQuantity: 1, reserved: 1, unit: 'garrafa' },
  { id: '5', name: 'Macarrão Penne 500g', category: 'Massas', quantity: 4, minQuantity: 2, reserved: 2, unit: 'pacote' },
];

const RESIDENTS = [
  { id: 'r1', name: 'Ana Silva', role: 'Morador Principal', avatar: '👩‍🍳', color: 'bg-emerald-500' },
  { id: 'r2', name: 'Bruno Costa', role: 'Morador', avatar: '👨‍💻', color: 'bg-blue-500' },
  { id: 'r3', name: 'Carla Dias', role: 'Morador', avatar: '👩‍🎨', color: 'bg-purple-500' },
];

export default function App() {
  // Estados principais da aplicação
  const [activeTab, setActiveTab] = useState('inventory'); // inventory, shopping, reservations, residents
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('dispensa_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [shoppingList, setShoppingList] = useState(() => {
    const saved = localStorage.getItem('dispensa_shopping');
    return saved ? JSON.parse(saved) : [
      { id: 's1', name: 'Leite Integral 1L', quantity: 2, bought: false, autoAdded: true },
      { id: 's2', name: 'Café Torrado 500g', quantity: 1, bought: false, autoAdded: true },
      { id: 's3', name: 'Detergente Neutro', quantity: 2, bought: true, autoAdded: false }
    ];
  });

  const [reservations, setReservations] = useState(() => {
    const saved = localStorage.getItem('dispensa_reservations');
    return saved ? JSON.parse(saved) : [
      { id: 'res1', title: 'Jantar de Domingo (Massa)', productId: '5', productName: 'Macarrão Penne 500g', quantity: 2, residentName: 'Ana Silva', date: '2026-11-08' },
      { id: 'res2', title: 'Almoço em Família', productId: '1', productName: 'Arroz Integral 1kg', quantity: 1, residentName: 'Bruno Costa', date: '2026-11-05' }
    ];
  });

  const [activityLogs, setActivityLogs] = useState(() => {
    const saved = localStorage.getItem('dispensa_logs');
    return saved ? JSON.parse(saved) : [
      { id: 'l1', user: 'Ana Silva', action: 'consumiu 1x Leite Integral 1L', time: 'Há 10 minutos' },
      { id: 'l2', user: 'Bruno Costa', action: 'adicionou reserva para Jantar de Domingo', time: 'Há 1 hora' }
    ];
  });

  const [currentResident, setCurrentResident] = useState(RESIDENTS[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Todos');

  // Formulário para Adicionar/Editar Produto
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({ name: '', category: 'Grãos', quantity: 1, minQuantity: 1, unit: 'unidade' });

  // Formulário para Nova Reserva
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);
  const [reserveForm, setReserveForm] = useState({ title: '', productId: '', quantity: 1, date: '' });

  // Novo item manual na lista de compras
  const [manualShopItem, setManualShopItem] = useState('');

  // Sincronização e persistência no localStorage
  useEffect(() => {
    localStorage.setItem('dispensa_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('dispensa_shopping', JSON.stringify(shoppingList));
  }, [shoppingList]);

  useEffect(() => {
    localStorage.setItem('dispensa_reservations', JSON.stringify(reservations));
  }, [reservations]);

  useEffect(() => {
    localStorage.setItem('dispensa_logs', JSON.stringify(activityLogs));
  }, [activityLogs]);

  // Função auxiliar para registrar logs de atividades dos moradores
  const addLog = (actionText) => {
    const newLog = {
      id: Date.now().toString(),
      user: currentResident.name,
      action: actionText,
      time: 'Agora mesmo'
    };
    setActivityLogs(prev => [newLog, ...prev.slice(0, 15)]);
  };

  // --- Ações do Estoque ---
  const handleUpdateQuantity = (id, delta) => {
    setProducts(prev => prev.map(prod => {
      if (prod.id === id) {
        const newQty = Math.max(0, prod.quantity + delta);
        // Regra de negócio: se a quantidade disponível for menor que o reservado, ajusta o reservado
        const newReserved = Math.min(prod.reserved, newQty);
        addLog(`${delta > 0 ? 'repos' : 'consumiu'} ${Math.abs(delta)}x ${prod.name}`);
        return { ...prod, quantity: newQty, reserved: newReserved };
      }
      return prod;
    }));
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    if (editingProduct) {
      setProducts(prev => prev.map(p => p.id === editingProduct.id ? { ...p, ...formData } : p));
      addLog(`editou o produto ${formData.name}`);
    } else {
      const newProd = {
        id: Date.now().toString(),
        ...formData,
        quantity: Number(formData.quantity),
        minQuantity: Number(formData.minQuantity),
        reserved: 0
      };
      setProducts(prev => [...prev, newProd]);
      addLog(`cadastrou o produto ${formData.name}`);
    }

    setIsProductModalOpen(false);
    setEditingProduct(null);
    setFormData({ name: '', category: 'Grãos', quantity: 1, minQuantity: 1, unit: 'unidade' });
  };

  const handleDeleteProduct = (id) => {
    const prod = products.find(p => p.id === id);
    if (prod) {
      setProducts(prev => prev.filter(p => p.id !== id));
      addLog(`removeu o produto ${prod.name} do estoque`);
    }
  };

  // --- Ações da Lista de Compras ---
  const syncLowStockToShoppingList = () => {
    let addedCount = 0;
    const newItems = [...shoppingList];

    products.forEach(prod => {
      if (prod.quantity <= prod.minQuantity) {
        const exists = newItems.find(item => item.name.toLowerCase() === prod.name.toLowerCase());
        if (!exists) {
          const neededQty = Math.max(1, prod.minQuantity - prod.quantity + 1);
          newItems.push({
            id: Date.now() + Math.random().toString(),
            name: prod.name,
            quantity: neededQty,
            bought: false,
            autoAdded: true
          });
          addedCount++;
        }
      }
    });

    if (addedCount > 0) {
      setShoppingList(newItems);
      addLog(`sincronizou ${addedCount} produtos com estoque baixo para a Lista de Compras`);
    }
  };

  const handleAddManualShopping = (e) => {
    e.preventDefault();
    if (!manualShopItem.trim()) return;
    const newItem = {
      id: Date.now().toString(),
      name: manualShopItem.trim(),
      quantity: 1,
      bought: false,
      autoAdded: false
    };
    setShoppingList(prev => [...prev, newItem]);
    addLog(`adicionou "${manualShopItem}" na lista de compras`);
    setManualShopItem('');
  };

  const toggleShoppingBought = (id) => {
    setShoppingList(prev => prev.map(item => item.id === id ? { ...item, bought: !item.bought } : item));
  };

  const removeShoppingItem = (id) => {
    setShoppingList(prev => prev.filter(item => item.id !== id));
  };

  // --- Ações de Reserva de Produtos ---
  const handleCreateReservation = (e) => {
    e.preventDefault();
    const targetProd = products.find(p => p.id === reserveForm.productId);
    if (!targetProd) return;

    const qtyToReserve = Number(reserveForm.quantity);
    const availableToReserve = targetProd.quantity - targetProd.reserved;

    if (qtyToReserve > availableToReserve) {
      alert(`Quantidade indisponível! Disponível para reserva: ${availableToReserve} ${targetProd.unit}(s).`);
      return;
    }

    // Atualiza a quantidade reservada no produto
    setProducts(prev => prev.map(p => p.id === targetProd.id ? { ...p, reserved: p.reserved + qtyToReserve } : p));

    const newRes = {
      id: Date.now().toString(),
      title: reserveForm.title,
      productId: targetProd.id,
      productName: targetProd.name,
      quantity: qtyToReserve,
      residentName: currentResident.name,
      date: reserveForm.date || new Date().toISOString().split('T')[0]
    };

    setReservations(prev => [newRes, ...prev]);
    addLog(`reservou ${qtyToReserve}x ${targetProd.name} para "${reserveForm.title}"`);

    setIsReserveModalOpen(false);
    setReserveForm({ title: '', productId: '', quantity: 1, date: '' });
  };

  const handleCancelReservation = (resId) => {
    const res = reservations.find(r => r.id === resId);
    if (res) {
      // Devolve a quantidade reservada
      setProducts(prev => prev.map(p => p.id === res.productId ? { ...p, reserved: Math.max(0, p.reserved - res.quantity) } : p));
      setReservations(prev => prev.filter(r => r.id !== resId));
      addLog(`cancelou a reserva de ${res.productName}`);
    }
  };

  // Filtros de produtos
  const categories = ['Todos', ...Array.from(newSet = new Set(products.map(p => p.category)))];
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'Todos' || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const lowStockCount = products.filter(p => p.quantity <= p.minQuantity).length;

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans flex flex-col md:flex-row">
      
      {/* SIDEBAR DE NAVEGAÇÃO & PERFIL DOS MORADORES */}
      <aside className="w-full md:w-72 bg-slate-900 text-white p-5 flex flex-col justify-between shrink-0 shadow-xl">
        <div>
          {/* Logo do App */}
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-emerald-500 p-2.5 rounded-xl shadow-lg text-slate-900">
              <Home className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <h1 className="font-extrabold text-xl tracking-tight text-white leading-tight">Dispensa Virtual</h1>
              <p className="text-xs text-slate-400 font-medium">Gestão Residencial EAP 1.0</p>
            </div>
          </div>

          {/* Seleção do Morador Atual (Simulação de Sincronização) */}
          <div className="bg-slate-800/90 border border-slate-700/80 p-3.5 rounded-xl mb-6">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
              Morador Ativo (Perfil)
            </label>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">{currentResident.avatar}</span>
              <div>
                <p className="font-bold text-sm text-white leading-tight">{currentResident.name}</p>
                <p className="text-xs text-emerald-400 font-medium">{currentResident.role}</p>
              </div>
            </div>
            <select 
              value={currentResident.id}
              onChange={(e) => setCurrentResident(RESIDENTS.find(r => r.id === e.target.value))}
              className="w-full bg-slate-900 border border-slate-700 text-xs text-slate-200 rounded-lg p-2 focus:ring-2 focus:ring-emerald-500 outline-none"
            >
              {RESIDENTS.map(r => (
                <option key={r.id} value={r.id}>{r.avatar} {r.name}</option>
              ))}
            </select>
          </div>

          {/* Menu de Navegação */}
          <nav className="space-y-1.5">
            <button
              onClick={() => setActiveTab('inventory')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'inventory' 
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20' 
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Package className="w-5 h-5" />
                <span>Estoque / Dispensa</span>
              </div>
              {lowStockCount > 0 && (
                <span className="bg-amber-500 text-slate-950 text-xs px-2 py-0.5 rounded-full font-bold">
                  {lowStockCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('shopping')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'shopping' 
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20' 
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <ShoppingCart className="w-5 h-5" />
                <span>Lista de Compras</span>
              </div>
              <span className="bg-slate-800 text-slate-300 text-xs px-2 py-0.5 rounded-full font-bold">
                {shoppingList.filter(i => !i.bought).length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('reservations')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'reservations' 
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20' 
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Bookmark className="w-5 h-5" />
                <span>Reserva de Itens</span>
              </div>
              <span className="bg-slate-800 text-slate-300 text-xs px-2 py-0.5 rounded-full font-bold">
                {reservations.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('residents')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'residents' 
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20' 
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Users className="w-5 h-5" />
              <span>Sincronia Moradores</span>
            </button>
          </nav>
        </div>

        {/* Rodapé da Sidebar */}
        <div className="mt-8 pt-4 border-t border-slate-800 text-xs text-slate-500 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Sincronizado
          </span>
          <span>EAP App v1.0</span>
        </div>
      </aside>

      {/* ÁREA DE CONTEÚDO PRINCIPAL */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto max-w-7xl mx-auto w-full">
        
        {/* TAB 1: ESTOQUE E DISPENSA */}
        {activeTab === 'inventory' && (
          <div className="space-y-6">
            
            {/* Header com Ações */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">Controle de Estoque</h2>
                <p className="text-sm text-slate-500 mt-1">Gerencie produtos, quantidades e monitore níveis críticos.</p>
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  onClick={syncLowStockToShoppingList}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 px-4 py-2.5 rounded-xl text-sm font-bold transition-all"
                  title="Gera itens automaticamente na lista de compras para produtos zerados ou abaixo do mínimo"
                >
                  <RefreshCw className="w-4 h-4" />
                  Auto Lista
                </button>
                <button
                  onClick={() => {
                    setEditingProduct(null);
                    setFormData({ name: '', category: 'Grãos', quantity: 1, minQuantity: 1, unit: 'unidade' });
                    setIsProductModalOpen(true);
                  }}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md shadow-emerald-600/20 transition-all"
                >
                  <Plus className="w-4 h-4 stroke-[3]" />
                  Novo Produto
                </button>
              </div>
            </div>

            {/* Banner de Alerta para Itens Críticos */}
            {lowStockCount > 0 && (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-500 text-slate-950 rounded-xl">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-amber-900 text-sm">Atenção ao Estoque Baixo</h4>
                    <p className="text-xs text-amber-700">Você possui {lowStockCount} produto(s) zerado(s) ou com quantidade abaixo da mínima recomendada.</p>
                  </div>
                </div>
                <button 
                  onClick={syncLowStockToShoppingList}
                  className="text-xs font-extrabold text-amber-900 underline hover:text-amber-950 whitespace-nowrap"
                >
                  Enviar para Lista
                </button>
              </div>
            )}

            {/* Barra de Pesquisa e Filtros */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Buscar produtos na dispensa..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
                />
              </div>
              <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setCategoryFilter(cat)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                      categoryFilter === cat 
                        ? 'bg-slate-900 text-white shadow-sm' 
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid de Produtos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProducts.map(product => {
                const isOut = product.quantity === 0;
                const isLow = product.quantity <= product.minQuantity && !isOut;
                const availableQty = product.quantity - product.reserved;

                return (
                  <div 
                    key={product.id}
                    className={`bg-white border rounded-2xl p-5 shadow-sm transition-all hover:shadow-md relative flex flex-col justify-between ${
                      isOut ? 'border-red-200 bg-red-50/20' : isLow ? 'border-amber-200 bg-amber-50/20' : 'border-slate-200'
                    }`}
                  >
                    <div>
                      {/* Topo do Card com Categoria e Status */}
                      <div className="flex justify-between items-start mb-3">
                        <span className="text-xs font-extrabold uppercase tracking-wider px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg">
                          {product.category}
                        </span>
                        
                        {isOut ? (
                          <span className="text-xs font-bold bg-red-100 text-red-700 px-2 py-0.5 rounded-md flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span> Em Falta
                          </span>
                        ) : isLow ? (
                          <span className="text-xs font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-md flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span> Estoque Baixo
                          </span>
                        ) : (
                          <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span> Normal
                          </span>
                        )}
                      </div>

                      {/* Nome do Produto */}
                      <h3 className="font-bold text-lg text-slate-900 leading-snug mb-1">{product.name}</h3>
                      <p className="text-xs text-slate-400 font-medium mb-4">Mínimo sugerido: {product.minQuantity} {product.unit}(s)</p>

                      {/* Info de Reservas caso existam */}
                      {product.reserved > 0 && (
                        <div className="mb-4 bg-purple-50 border border-purple-100 p-2 rounded-xl flex items-center gap-2 text-xs text-purple-700 font-medium">
                          <Bookmark className="w-4 h-4 shrink-0 text-purple-600" />
                          <span><b>{product.reserved} {product.unit}(s)</b> reservados para uso</span>
                        </div>
                      )}
                    </div>

                    {/* Controles de Quantidade e Ações */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleUpdateQuantity(product.id, -1)}
                          disabled={product.quantity === 0}
                          className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold flex items-center justify-center transition-all disabled:opacity-40"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        
                        <div className="text-center min-w-[50px]">
                          <span className="text-xl font-black text-slate-900">{product.quantity}</span>
                          <span className="text-xs text-slate-400 font-bold block">{product.unit}</span>
                        </div>

                        <button
                          onClick={() => handleUpdateQuantity(product.id, 1)}
                          className="w-9 h-9 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold flex items-center justify-center shadow-md shadow-emerald-500/20 transition-all"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Botões de Ação Secundária */}
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => {
                            setEditingProduct(product);
                            setFormData({
                              name: product.name,
                              category: product.category,
                              quantity: product.quantity,
                              minQuantity: product.minQuantity,
                              unit: product.unit
                            });
                            setIsProductModalOpen(true);
                          }}
                          className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-all"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="p-2 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: LISTA DE COMPRAS */}
        {activeTab === 'shopping' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">Lista de Compras</h2>
              <p className="text-sm text-slate-500 mt-1">Produtos adicionados automaticamente pelo estoque crítico ou manualmente pelos moradores.</p>
            </div>

            {/* Adição Manual de Itens */}
            <form onSubmit={handleAddManualShopping} className="flex gap-2">
              <input
                type="text"
                placeholder="Adicionar item manualmente (ex: Sabão em pó)..."
                value={manualShopItem}
                onChange={(e) => setManualShopItem(e.target.value)}
                className="flex-1 bg-white border border-slate-200 px-4 py-3 rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-500 outline-none shadow-sm"
              />
              <button
                type="submit"
                className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-md transition-all flex items-center gap-2"
              >
                <Plus className="w-4 h-4" /> Adicionar
              </button>
            </form>

            {/* Lista de Itens Pendentes */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h3 className="font-bold text-base text-slate-900 mb-4 flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-emerald-600" />
                Itens para Comprar ({shoppingList.filter(i => !i.bought).length})
              </h3>

              <div className="space-y-2">
                {shoppingList.filter(i => !i.bought).length === 0 ? (
                  <p className="text-sm text-slate-400 py-6 text-center italic">Nenhum item pendente na lista de compras.</p>
                ) : (
                  shoppingList.filter(i => !i.bought).map(item => (
                    <div 
                      key={item.id}
                      className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl hover:bg-slate-100/80 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => toggleShoppingBought(item.id)}
                          className="w-6 h-6 border-2 border-slate-300 rounded-lg flex items-center justify-center hover:border-emerald-500 transition-all"
                        >
                        </button>
                        <div>
                          <span className="font-bold text-slate-800 text-sm">{item.name}</span>
                          {item.autoAdded && (
                            <span className="ml-2 bg-amber-100 text-amber-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                              Sugerido pelo Estoque
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold bg-slate-200 text-slate-700 px-2.5 py-1 rounded-lg">
                          Qtd: {item.quantity}
                        </span>
                        <button 
                          onClick={() => removeShoppingItem(item.id)}
                          className="text-slate-400 hover:text-red-600 p-1 rounded-md"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Seção de Comprados */}
              {shoppingList.some(i => i.bought) && (
                <div className="mt-8 pt-6 border-t border-slate-100">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400 mb-3">Concluídos / Comprados</h4>
                  <div className="space-y-2">
                    {shoppingList.filter(i => i.bought).map(item => (
                      <div key={item.id} className="flex items-center justify-between p-3 bg-slate-50/50 rounded-xl opacity-60">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => toggleShoppingBought(item.id)}
                            className="w-6 h-6 bg-emerald-500 text-white rounded-lg flex items-center justify-center"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                          </button>
                          <span className="line-through font-medium text-slate-600 text-sm">{item.name}</span>
                        </div>
                        <button onClick={() => removeShoppingItem(item.id)} className="text-slate-400 hover:text-red-600">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: RESERVA DE PRODUTOS */}
        {activeTab === 'reservations' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">Reserva para Receitas &amp; Eventos</h2>
                <p className="text-sm text-slate-500 mt-1">Garanta que produtos não sejam consumidos por outros moradores antes da data planejada.</p>
              </div>
              <button
                onClick={() => setIsReserveModalOpen(true)}
                className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md shadow-purple-600/20 transition-all flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Nova Reserva
              </button>
            </div>

            {/* Grid de Reservas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reservations.length === 0 ? (
                <div className="col-span-full bg-white p-12 rounded-2xl border border-slate-200 text-center">
                  <ChefHat className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-500 font-medium">Nenhuma reserva ativa no momento.</p>
                </div>
              ) : (
                reservations.map(res => (
                  <div key={res.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-bold text-purple-700 bg-purple-50 border border-purple-100 px-2.5 py-1 rounded-lg flex items-center gap-1.5">
                          <ChefHat className="w-3.5 h-3.5" /> {res.residentName}
                        </span>
                        <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" /> {res.date}
                        </span>
                      </div>
                      <h3 className="font-bold text-lg text-slate-900 mb-1">{res.title}</h3>
                      <p className="text-sm text-slate-600">
                        Item reservado: <b className="text-slate-900">{res.quantity}x {res.productName}</b>
                      </p>
                    </div>

                    <div className="mt-4 pt-4 border-t border-slate-100 flex justify-end">
                      <button
                        onClick={() => handleCancelReservation(res.id)}
                        className="text-xs font-bold text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-all"
                      >
                        Cancelar Reserva
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TAB 4: SINCRONIA E MORADORES */}
        {activeTab === 'residents' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">Moradores &amp; Atualizações em Tempo Real</h2>
              <p className="text-sm text-slate-500 mt-1">Simulação de banco de dados compartilhado entre moradores da mesma residência.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {RESIDENTS.map(res => (
                <div 
                  key={res.id}
                  className={`bg-white border rounded-2xl p-5 shadow-sm transition-all ${
                    currentResident.id === res.id ? 'border-emerald-500 ring-2 ring-emerald-500/20' : 'border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">{res.avatar}</span>
                    <div>
                      <h4 className="font-bold text-slate-900">{res.name}</h4>
                      <span className="text-xs text-slate-500 font-medium">{res.role}</span>
                    </div>
                  </div>
                  {currentResident.id === res.id ? (
                    <span className="inline-block w-full text-center text-xs font-extrabold bg-emerald-100 text-emerald-800 py-1.5 rounded-lg">
                      Perfil Ativo no Momento
                    </span>
                  ) : (
                    <button
                      onClick={() => setCurrentResident(res)}
                      className="w-full text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 py-1.5 rounded-lg transition-all"
                    >
                      Alternar para Este Perfil
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Log de Atividades Compartilhadas */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h3 className="font-bold text-base text-slate-900 mb-4 flex items-center gap-2">
                <RefreshCw className="w-5 h-5 text-emerald-600" />
                Histórico de Atualizações Recentes
              </h3>
              <div className="space-y-3">
                {activityLogs.map(log => (
                  <div key={log.id} className="flex items-start justify-between p-3 bg-slate-50 rounded-xl text-xs">
                    <div>
                      <span className="font-bold text-slate-900">{log.user}</span>{' '}
                      <span className="text-slate-600">{log.action}</span>
                    </div>
                    <span className="text-slate-400 font-medium whitespace-nowrap ml-2">{log.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </main>

      {/* MODAL: ADICIONAR / EDITAR PRODUTO */}
      {isProductModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <h3 className="text-xl font-bold text-slate-900 mb-4">
              {editingProduct ? 'Editar Produto' : 'Cadastrar Novo Produto'}
            </h3>
            
            <form onSubmit={handleSaveProduct} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">Nome do Produto</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Feijão Carioca 1kg"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border border-slate-200 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">Categoria</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full border border-slate-200 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="Grãos">Grãos</option>
                    <option value="Laticínios">Laticínios</option>
                    <option value="Matinais">Matinais</option>
                    <option value="Temperos">Temperos</option>
                    <option value="Massas">Massas</option>
                    <option value="Limpeza">Limpeza</option>
                    <option value="Higiene">Higiene</option>
                    <option value="Bebidas">Bebidas</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">Unidade</label>
                  <input
                    type="text"
                    placeholder="Ex: pacote, caixa, kg"
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                    className="w-full border border-slate-200 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">Qtd Atual</label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="w-full border border-slate-200 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">Qtd Mínima</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={formData.minQuantity}
                    onChange={(e) => setFormData({ ...formData, minQuantity: e.target.value })}
                    className="w-full border border-slate-200 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2 text-sm font-bold text-slate-500 hover:bg-slate-100 rounded-xl"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-sm font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-md"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: NOVA RESERVA */}
      {isReserveModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Nova Reserva de Produto</h3>
            
            <form onSubmit={handleCreateReservation} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">Título da Reserva / Motivo</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Receita de Strogonoff"
                  value={reserveForm.title}
                  onChange={(e) => setReserveForm({ ...reserveForm, title: e.target.value })}
                  className="w-full border border-slate-200 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">Selecione o Produto</label>
                <select
                  required
                  value={reserveForm.productId}
                  onChange={(e) => setReserveForm({ ...reserveForm, productId: e.target.value })}
                  className="w-full border border-slate-200 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">-- Escolha um produto --</option>
                  {products.map(p => {
                    const avail = p.quantity - p.reserved;
                    return (
                      <option key={p.id} value={p.id} disabled={avail <= 0}>
                        {p.name} (Disponível para reservar: {avail})
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">Quantidade</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={reserveForm.quantity}
                    onChange={(e) => setReserveForm({ ...reserveForm, quantity: e.target.value })}
                    className="w-full border border-slate-200 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">Data Prevista</label>
                  <input
                    type="date"
                    required
                    value={reserveForm.date}
                    onChange={(e) => setReserveForm({ ...reserveForm, date: e.target.value })}
                    className="w-full border border-slate-200 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsReserveModalOpen(false)}
                  className="px-4 py-2 text-sm font-bold text-slate-500 hover:bg-slate-100 rounded-xl"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-sm font-bold bg-purple-600 hover:bg-purple-700 text-white rounded-xl shadow-md"
                >
                  Reservar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
export default App;