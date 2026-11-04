import { useState } from 'react';
import { 
  Package, ShoppingCart, Users, AlertTriangle, CheckCircle2, 
  Plus, Minus, Trash2, Shield, Calendar, RefreshCw, Search,
  ArrowUpDown, Filter, Sparkles, Home, Check
} from 'lucide-react';

function App() {
  // Estado inicial dos produtos na despensa
  const [items, setItems] = useState([
    { id: 1, name: 'Arroz 5kg', category: 'Grãos', quantity: 2, minQuantity: 1, unit: 'pct', expiryDate: '2026-08-15', addedBy: 'Vitor' },
    { id: 2, name: 'Feijão Carioca 1kg', category: 'Grãos', quantity: 1, minQuantity: 2, unit: 'pct', expiryDate: '2026-05-10', addedBy: 'Ana' },
    { id: 3, name: 'Leite Integral 1L', category: 'Laticínios', quantity: 4, minQuantity: 6, unit: 'un', expiryDate: '2026-03-12', addedBy: 'Carlos' },
    { id: 4, name: 'Azeite de Oliva', category: 'Temperos', quantity: 1, minQuantity: 1, unit: 'un', expiryDate: '2027-01-20', addedBy: 'Vitor' },
    { id: 5, name: 'Café em Pó 500g', category: 'Bebidas', quantity: 3, minQuantity: 2, unit: 'pct', expiryDate: '2026-10-05', addedBy: 'Ana' }
  ]);

  // Lista de compras gerada (itens abaixo do mínimo)
  const [shoppingList, setShoppingList] = useState([
    { id: 101, name: 'Leite Integral 1L', quantityNeeded: 2, checked: false },
    { id: 102, name: 'Feijão Carioca 1kg', quantityNeeded: 1, checked: false }
  ]);

  // Moradores da república/casa
  const [residents, setResidents] = useState([
    { id: 1, name: 'Vitor', avatar: '👨‍💻', balance: '+ R$ 15,00' },
    { id: 2, name: 'Ana', avatar: '👩‍🔬', balance: '- R$ 10,00' },
    { id: 3, name: 'Carlos', avatar: '👨‍🎨', balance: 'R$ 0,00' }
  ]);

  const [activeTab, setActiveTab] = useState('pantry');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form state para novo item
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
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-12">
      {/* Header */}
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
              <p className="text-xs text-indigo-200">Gestão inteligente de mantimentos para repúblicas e lares</p>
            </div>
          </div>

          {/* Navegação por Abas */}
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

      {/* Conteúdo Principal */}
      <main className="max-w-6xl mx-auto px-4 mt-8">
        {activeTab === 'pantry' && (
          <div className="space-y-6">
            {/* Barra de Ações e Filtros */}
            <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 bg-white p-4 rounded-3xl shadow-sm border border-slate-100">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Pesquisar mantimento..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
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

            {/* Grid de Produtos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredItems.map((item) => {
                const isLow = item.quantity <= item.minQuantity;
                return (
                  <div 
                    key={item.id}
                    className={`bg-white p-5 rounded-3xl border transition-all hover:shadow-md flex flex-col justify-between ${
                      isLow ? 'border-amber-300 bg-amber-50/20' : 'border-slate-100'
                    }`}
                  >
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
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-bold transition-all active:scale-90"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="font-black text-lg text-slate-800 min-w-[2rem] text-center">
                          {item.quantity} <span className="text-xs font-medium text-slate-400">{item.unit}</span>
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-8 h-8 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold transition-all active:scale-90"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        onClick={() => deleteItem(item.id)}
                        className="text-slate-300 hover:text-rose-500 p-2 rounded-xl transition-all"
                        title="Remover item"
                      >
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
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-lg font-bold text-slate-800">Lista de Compras Automática</h2>
                <p className="text-xs text-slate-400">Gerada com base nos itens abaixo do estoque mínimo</p>
              </div>
              <button 
                onClick={() => alert('Lista sincronizada com sucesso!')}
                className="flex items-center gap-2 text-xs font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-4 py-2 rounded-xl transition-all"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Atualizar
              </button>
            </div>

            <div className="space-y-3">
              {shoppingList.map((shopItem) => (
                <div key={shopItem.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-3">
                    <input 
                      type="checkbox" 
                      className="w-5 h-5 rounded-lg text-indigo-600 focus:ring-indigo-500 border-slate-300"
                    />
                    <span className="font-bold text-sm text-slate-700">{shopItem.name}</span>
                  </div>
                  <span className="text-xs font-bold bg-indigo-100 text-indigo-700 px-3 py-1 rounded-xl">
                    Comprar: {shopItem.quantityNeeded} un
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'residents' && (
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
              <h2 className="text-lg font-bold text-slate-800 mb-1">Moradores da Casa</h2>
              <p className="text-xs text-slate-400 mb-6">Quem comprou o quê e divisão de contas</p>

              <div className="space-y-3">
                {residents.map((res) => (
                  <div key={res.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{res.avatar}</span>
                      <div>
                        <h4 className="font-bold text-sm text-slate-800">{res.name}</h4>
                        <p className="text-xs text-slate-400">Responsável pelo turno</p>
                      </div>
                    </div>
                    <span className={`text-xs font-black px-3 py-1.5 rounded-xl ${
                      res.balance.includes('+') ? 'bg-emerald-100 text-emerald-700' : 
                      res.balance.includes('-') ? 'bg-rose-100 text-rose-700' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {res.balance}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Modal de Adicionar Item */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl animate-in fade-in zoom-in duration-200">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Adicionar Novo Mantimento</h3>
            
            <form onSubmit={handleAddItem} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Nome do Item</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Arroz 5kg"
                  value={newItem.name}
                  onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Categoria</label>
                  <select
                    value={newItem.category}
                    onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
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
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Quantidade Atual</label>
                  <input
                    type="number"
                    min="0"
                    value={newItem.quantity}
                    onChange={(e) => setNewItem({...newItem, quantity: e.target.value})}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Estoque Mínimo</label>
                  <input
                    type="number"
                    min="0"
                    value={newItem.minQuantity}
                    onChange={(e) => setNewItem({...newItem, minQuantity: e.target.value})}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
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

export default App;