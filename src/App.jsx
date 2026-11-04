import { useState } from 'react';
import { 
  Package, ShoppingCart, Users, AlertTriangle, CheckCircle2, 
  Plus, Minus, Trash2, Shield, Calendar, RefreshCw, Search,
  ArrowUpDown, Filter, Sparkles, Home, Check
} from 'lucide-react';

function App() {
  // ==========================================
  // 1. BASE DE DADOS PRÉ-CADASTRADA (SUGESTÕES)
  // ==========================================
  const PRESET_PRODUCTS = [
    // Grãos e Massas
    { name: 'Arroz 5kg', category: 'Grãos', unit: 'pct', minQuantity: 1 },
    { name: 'Feijão Carioca 1kg', category: 'Grãos', unit: 'pct', minQuantity: 2 },
    { name: 'Açúcar 1kg', category: 'Grãos', unit: 'pct', minQuantity: 2 },
    { name: 'Sal Refinado 1kg', category: 'Temperos', unit: 'pct', minQuantity: 1 },
    { name: 'Farinha de Trigo 1kg', category: 'Grãos', unit: 'pct', minQuantity: 1 },
    { name: 'Farinha de Mandioca', category: 'Grãos', unit: 'pct', minQuantity: 1 },
    { name: 'Fubá', category: 'Grãos', unit: 'pct', minQuantity: 1 },
    { name: 'Macarrão Spagetti 500g', category: 'Grãos', unit: 'pct', minQuantity: 2 },
    { name: 'Amido de Milho', category: 'Grãos', unit: 'cx', minQuantity: 1 },
    { name: 'Aveia', category: 'Grãos', unit: 'pct', minQuantity: 1 },
    { name: 'Tapioca', category: 'Grãos', unit: 'pct', minQuantity: 1 },
    { name: 'Milho para Pipoca', category: 'Grãos', unit: 'pct', minQuantity: 1 },

    // Óleos e Molhos
    { name: 'Óleo de Soja 900ml', category: 'Temperos', unit: 'un', minQuantity: 2 },
    { name: 'Azeite de Oliva 500ml', category: 'Temperos', unit: 'un', minQuantity: 1 },
    { name: 'Vinagre', category: 'Temperos', unit: 'un', minQuantity: 1 },
    { name: 'Molho de Tomate 340g', category: 'Temperos', unit: 'un', minQuantity: 3 },
    { name: 'Extrato de Tomate', category: 'Temperos', unit: 'un', minQuantity: 2 },
    { name: 'Milho-verde em Conserva', category: 'Outros', unit: 'un', minQuantity: 2 },
    { name: 'Ervilha em Conserva', category: 'Outros', unit: 'un', minQuantity: 2 },
    { name: 'Atum em Lata', category: 'Outros', unit: 'un', minQuantity: 2 },
    { name: 'Sardinha em Lata', category: 'Outros', unit: 'un', minQuantity: 2 },
    { name: 'Azeitona', category: 'Outros', unit: 'un', minQuantity: 1 },
    { name: 'Palmito', category: 'Outros', unit: 'un', minQuantity: 1 },
    { name: 'Leite de Coco', category: 'Outros', unit: 'un', minQuantity: 1 },

    // Café e Matinais
    { name: 'Café em Pó 500g', category: 'Bebidas', unit: 'pct', minQuantity: 2 },
    { name: 'Leite Integral 1L', category: 'Laticínios', unit: 'un', minQuantity: 6 },
    { name: 'Achocolatado em Pó', category: 'Bebidas', unit: 'un', minQuantity: 1 },
    { name: 'Chá', category: 'Bebidas', unit: 'cx', minQuantity: 1 },
    { name: 'Pão de Forma', category: 'Outros', unit: 'pct', minQuantity: 2 },
    { name: 'Torradas', category: 'Outros', unit: 'pct', minQuantity: 1 },
    { name: 'Biscoito Doce / Recheado', category: 'Outros', unit: 'pct', minQuantity: 2 },
    { name: 'Cereal Matinal / Granola', category: 'Bebidas', unit: 'pct', minQuantity: 1 },
    { name: 'Manteiga / Margarina 200g', category: 'Laticínios', unit: 'un', minQuantity: 1 },
    { name: 'Requeijão', category: 'Laticínios', unit: 'un', minQuantity: 1 },
    { name: 'Doce de Leite / Geleia', category: 'Outros', unit: 'un', minQuantity: 1 },

    // Temperos e Condimentos
    { name: 'Alho e Cebola', category: 'Temperos', unit: 'un', minQuantity: 1 },
    { name: 'Orégano / Pimenta-do-reino', category: 'Temperos', unit: 'un', minQuantity: 1 },
    { name: 'Colorau / Páprica', category: 'Temperos', unit: 'un', minQuantity: 1 },
    { name: 'Caldo de Carne / Galinha', category: 'Temperos', unit: 'cx', minQuantity: 2 },
    { name: 'Maionese / Ketchup / Mostarda', category: 'Temperos', unit: 'un', minQuantity: 1 },
    { name: 'Molho Shoyu', category: 'Temperos', unit: 'un', minQuantity: 1 },

    // Carnes e Congelados
    { name: 'Peito de Frango / Filé', category: 'Outros', unit: 'kg', minQuantity: 2 },
    { name: 'Carne Bovina Moída', category: 'Outros', unit: 'kg', minQuantity: 2 },
    { name: 'Linguiça / Salsicha', category: 'Outros', unit: 'pct', minQuantity: 1 },
    { name: 'Bacon', category: 'Outros', unit: 'pct', minQuantity: 1 },
    { name: 'Hambúrguer Congelado', category: 'Outros', unit: 'pct', minQuantity: 1 },
    { name: 'Batata Congelada', category: 'Outros', unit: 'pct', minQuantity: 1 },
    { name: 'Pão de Queijo', category: 'Outros', unit: 'pct', minQuantity: 1 }
  ];

  // ==========================================
  // 2. ESTADOS DO APLICATIVO
  // ==========================================
  const [items, setItems] = useState([
    { id: 1, name: 'Arroz 5kg', category: 'Grãos', quantity: 2, minQuantity: 1, unit: 'pct', expiryDate: '2026-08-15', addedBy: 'Vitor' },
    { id: 2, name: 'Feijão Carioca 1kg', category: 'Grãos', quantity: 1, minQuantity: 2, unit: 'pct', expiryDate: '2026-05-10', addedBy: 'Ana' },
    { id: 3, name: 'Leite Integral 1L', category: 'Laticínios', quantity: 4, minQuantity: 6, unit: 'un', expiryDate: '2026-03-12', addedBy: 'Carlos' }
  ]);

  const [shoppingList] = useState([
    { id: 101, name: 'Leite Integral 1L', quantityNeeded: 2, checked: false }
  ]);

  const [residents] = useState([
    { id: 1, name: 'Vitor', avatar: '👨‍💻', balance: '+ R$ 15,00' },
    { id: 2, name: 'Ana', avatar: '👩‍🔬', balance: '- R$ 10,00' },
    { id: 3, name: 'Carlos', avatar: '👨‍🎨', balance: 'R$ 0,00' }
  ]);

  const [activeTab, setActiveTab] = useState('pantry');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [newItem, setNewItem] = useState({
    name: '',
    category: 'Grãos',
    quantity: 1,
    minQuantity: 1,
    unit: 'un',
    expiryDate: '',
    addedBy: 'Vitor'
  });

  const categories = ['Todos', 'Grãos', 'Laticínios', 'Temperos', 'Bebidas', 'Limpeza', 'Outros'];

  // ==========================================
  // 3. FUNÇÃO DE NORMALIZAÇÃO (SEM ACENTOS E SEM DIFERENÇA DE CAIXA)
  // ==========================================
  const normalizeText = (text) => {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  };

  // Filtra sugestões ignorando maiúsculas, minúsculas e acentos incorretos
  const matchingPresets = newItem.name.trim() === '' ? [] : PRESET_PRODUCTS.filter(p => 
    normalizeText(p.name).includes(normalizeText(newItem.name))
  ).slice(0, 5);

  const handleSelectPreset = (preset) => {
    setNewItem({
      ...newItem,
      name: preset.name,
      category: preset.category,
      unit: preset.unit,
      minQuantity: preset.minQuantity
    });
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newItem.name) return;
    
    const itemToAdd = {
      id: Date.now(),
      ...newItem,
      quantity: Number(newItem.quantity),
      minQuantity: Number(newItem.minQuantity)
    };

    setItems([...items, itemToAdd]);
    setNewItem({ name: '', category: 'Grãos', quantity: 1, minQuantity: 1, unit: 'un', expiryDate: '', addedBy: 'Vitor' });
    setIsAddModalOpen(false);
  };

  const updateQuantity = (id, delta) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const newQty = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const deleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = normalizeText(item.name).includes(normalizeText(searchTerm));
    const matchesCategory = selectedCategory === 'Todos' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // ==========================================
  // 4. INTERFACE GRÁFICA (JSX)
  // ==========================================
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-12">
      
      {/* Cabeçalho */}
      <header className="bg-indigo-700 text-white shadow-lg sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-white/10 p-2.5 rounded-2xl backdrop-blur-md">
              <Package className="w-7 h-7 text-indigo-200" />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight flex items-center gap-2">
                Dispensa Virtual <span className="text-xs bg-indigo-500/50 px-2 py-0.5 rounded-full font-medium">Acadêmico</span>
              </h1>
              <p className="text-xs text-indigo-200">Gestão inteligente de mantimentos</p>
            </div>
          </div>

          <nav className="flex bg-indigo-900/40 p-1.5 rounded-2xl gap-1 border border-indigo-600/30">
            <button
              onClick={() => setActiveTab('pantry')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'pantry' ? 'bg-white text-indigo-700 shadow-md' : 'text-indigo-100 hover:bg-indigo-800/50'
              }`}
            >
              <Package className="w-4 h-4" /> Despensa
            </button>
            <button
              onClick={() => setActiveTab('shopping')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'shopping' ? 'bg-white text-indigo-700 shadow-md' : 'text-indigo-100 hover:bg-indigo-800/50'
              }`}
            >
              <ShoppingCart className="w-4 h-4" /> Compras
              {shoppingList.length > 0 && (
                <span className="bg-rose-500 text-white text-[10px] px-1.5 py-0.2 rounded-full font-black">
                  {shoppingList.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('residents')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'residents' ? 'bg-white text-indigo-700 shadow-md' : 'text-indigo-100 hover:bg-indigo-800/50'
              }`}
            >
              <Users className="w-4 h-4" /> Moradores
            </button>
          </nav>
        </div>
      </header>

      {/* Conteúdo */}
      <main className="max-w-6xl mx-auto px-4 mt-8">
        {activeTab === 'pantry' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 bg-white p-4 rounded-3xl shadow-sm border border-slate-100">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Pesquisar mantimento..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <button
                onClick={() => setIsAddModalOpen(true)}
                className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-2xl text-sm font-bold shadow-md shadow-indigo-200 transition-all active:scale-95"
              >
                <Plus className="w-4 h-4" /> Novo Item
              </button>
            </div>

            {/* Categorias */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredItems.map((item) => {
                const isLow = item.quantity <= item.minQuantity;
                return (
                  <div key={item.id} className={`bg-white p-5 rounded-3xl border transition-all hover:shadow-md flex flex-col justify-between ${isLow ? 'border-amber-300 bg-amber-50/20' : 'border-slate-100'}`}>
                    <div>
                      <div className="flex justify-between items-start gap-2 mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 bg-slate-100 text-slate-600 rounded-xl">
                          {item.category}
                        </span>
                        {isLow && (
                          <span className="flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-xl">
                            <AlertTriangle className="w-3 h-3" /> Estoque Baixo
                          </span>
                        )}
                      </div>
                      <h3 className="font-bold text-slate-800 text-base mb-1">{item.name}</h3>
                      <p className="text-xs text-slate-400 flex items-center gap-1 mb-4">
                        <Calendar className="w-3.5 h-3.5" /> Validade: {item.expiryDate || 'Não informada'}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <button onClick={() => updateQuantity(item.id, -1)} className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-bold">
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="font-black text-lg text-slate-800 min-w-[2rem] text-center">
                          {item.quantity} <span className="text-xs font-medium text-slate-400">{item.unit}</span>
                        </span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="w-8 h-8 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button onClick={() => deleteItem(item.id)} className="text-slate-300 hover:text-rose-500 p-2 rounded-xl transition-all">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'shopping' && (
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm max-w-2xl mx-auto">
            <h2 className="text-lg font-bold text-slate-800 mb-4">Lista de Compras Automática</h2>
            <div className="space-y-3">
              {shoppingList.map((shopItem) => (
                <div key={shopItem.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="font-bold text-sm text-slate-700">{shopItem.name}</span>
                  <span className="text-xs font-bold bg-indigo-100 text-indigo-700 px-3 py-1 rounded-xl">Comprar: {shopItem.quantityNeeded} un</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'residents' && (
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
              <h2 className="text-lg font-bold text-slate-800 mb-4">Moradores da Casa</h2>
              <div className="space-y-3">
                {residents.map((res) => (
                  <div key={res.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{res.avatar}</span>
                      <h4 className="font-bold text-sm text-slate-800">{res.name}</h4>
                    </div>
                    <span className="text-xs font-black px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-700">{res.balance}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ==========================================
          5. MODAL COM AUTOCOMPLETE INTELIGENTE
          ========================================== */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Adicionar Novo Mantimento</h3>
            
            <form onSubmit={handleAddItem} className="space-y-4">
              {/* Campo de Nome com Sugestões */}
              <div className="relative">
                <label className="block text-xs font-bold text-slate-600 mb-1 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600" /> Nome do Item (Digite sem acento ou minúsculo)
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: acucar, feijao, cafe..."
                  value={newItem.name}
                  onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />

                {/* Lista suspensa de pré-visualização */}
                {matchingPresets.length > 0 && (
                  <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-slate-200 rounded-2xl shadow-xl z-30 overflow-hidden max-h-48 overflow-y-auto">
                    {matchingPresets.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSelectPreset(preset)}
                        className="w-full text-left px-4 py-2.5 text-xs font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 flex justify-between items-center border-b border-slate-100 last:border-none transition-all"
                      >
                        <span className="font-bold">{preset.name}</span>
                        <span className="text-[10px] bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-md font-semibold">{preset.category}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Categoria (Tipo)</label>
                  <select
                    value={newItem.category}
                    onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  >
                    {categories.filter(c => c !== 'Todos').map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Validade</label>
                  <input
                    type="date"
                    value={newItem.expiryDate}
                    onChange={(e) => setNewItem({...newItem, expiryDate: e.target.value})}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Quantidade</label>
                  <input
                    type="number"
                    min="0"
                    value={newItem.quantity}
                    onChange={(e) => setNewItem({...newItem, quantity: e.target.value})}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Estoque Mínimo</label>
                  <input
                    type="number"
                    min="0"
                    value={newItem.minQuantity}
                    onChange={(e) => setNewItem({...newItem, minQuantity: e.target.value})}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-sm font-bold text-slate-500 hover:bg-slate-100 rounded-xl"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-sm font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md"
                >
                  Adicionar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// Exportação padrão obrigatória na última linha
export default App;