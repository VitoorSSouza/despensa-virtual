import { useState } from 'react';
import { 
  Package, ShoppingCart, Users, AlertTriangle, CheckCircle2, 
  Plus, Minus, Trash2, Calendar, Search, Sparkles, X, LayoutGrid
} from 'lucide-react';

function App() {
  // ==========================================
  // 1. BASE DE DADOS DE PRODUTOS PRÉ-CADASTRADOS
  // ==========================================
  const PRESET_PRODUCTS = [
    { name: 'Arroz', category: 'Grãos', unit: 'pct', minQuantity: 1 },
    { name: 'Feijão Carioca', category: 'Grãos', unit: 'pct', minQuantity: 2 },
    { name: 'Farinha de Trigo', category: 'Grãos', unit: 'pct', minQuantity: 1 },
    { name: 'Farinha de Mandioca', category: 'Grãos', unit: 'pct', minQuantity: 1 },
    { name: 'Fubá', category: 'Grãos', unit: 'pct', minQuantity: 1 },
    { name: 'Macarrão', category: 'Grãos', unit: 'pct', minQuantity: 2 },
    { name: 'Amido de Milho', category: 'Grãos', unit: 'cx', minQuantity: 1 },
    { name: 'Aveia', category: 'Grãos', unit: 'pct', minQuantity: 1 },
    { name: 'Tapioca', category: 'Grãos', unit: 'pct', minQuantity: 1 },
    { name: 'Milho para Pipoca', category: 'Grãos', unit: 'pct', minQuantity: 1 },

    { name: 'Leite Integral', category: 'Laticínios', unit: 'un', minQuantity: 6 },
    { name: 'Manteiga / Margarina', category: 'Laticínios', unit: 'un', minQuantity: 1 },
    { name: 'Requeijão', category: 'Laticínios', unit: 'un', minQuantity: 1 },
    { name: 'Queijo Mussarela', category: 'Laticínios', unit: 'pct', minQuantity: 1 },

    { name: 'Café em Pó', category: 'Bebidas', unit: 'pct', minQuantity: 2 },
    { name: 'Achocolatado em Pó', category: 'Bebidas', unit: 'un', minQuantity: 1 },
    { name: 'Chá', category: 'Bebidas', unit: 'cx', minQuantity: 1 },
    { name: 'Cereal Matinal / Granola', category: 'Bebidas', unit: 'pct', minQuantity: 1 },

    { name: 'Óleo de Soja', category: 'Temperos', unit: 'un', minQuantity: 2 },
    { name: 'Azeite de Oliva', category: 'Temperos', unit: 'un', minQuantity: 1 },
    { name: 'Sal Refinado', category: 'Temperos', unit: 'pct', minQuantity: 1 },
    { name: 'Vinagre', category: 'Temperos', unit: 'un', minQuantity: 1 },
    { name: 'Molho de Tomate', category: 'Temperos', unit: 'un', minQuantity: 3 },
    { name: 'Extrato de Tomate', category: 'Temperos', unit: 'un', minQuantity: 2 },
    { name: 'Alho e Cebola', category: 'Temperos', unit: 'un', minQuantity: 1 },
    { name: 'Orégano / Pimenta-do-reino', category: 'Temperos', unit: 'un', minQuantity: 1 },
    { name: 'Colorau / Páprica', category: 'Temperos', unit: 'un', minQuantity: 1 },
    { name: 'Caldo de Carne / Galinha', category: 'Temperos', unit: 'cx', minQuantity: 2 },
    { name: 'Maionese / Ketchup / Mostarda', category: 'Temperos', unit: 'un', minQuantity: 1 },
    { name: 'Molho Shoyu', category: 'Temperos', unit: 'un', minQuantity: 1 },

    { name: 'Detergente Líquido', category: 'Limpeza', unit: 'un', minQuantity: 3 },
    { name: 'Sabão em Pó', category: 'Limpeza', unit: 'cx', minQuantity: 1 },
    { name: 'Papel Higiênico', category: 'Limpeza', unit: 'pct', minQuantity: 2 },
    { name: 'Esponja de Aço / Louça', category: 'Limpeza', unit: 'pct', minQuantity: 1 },

    { name: 'Açúcar', category: 'Outros', unit: 'pct', minQuantity: 2 },
    { name: 'Pão de Forma', category: 'Outros', unit: 'pct', minQuantity: 2 },
    { name: 'Torradas', category: 'Outros', unit: 'pct', minQuantity: 1 },
    { name: 'Biscoito Doce / Recheado', category: 'Outros', unit: 'pct', minQuantity: 2 },
    { name: 'Doce de Leite / Geleia', category: 'Outros', unit: 'un', minQuantity: 1 },
    { name: 'Milho-verde em Conserva', category: 'Outros', unit: 'un', minQuantity: 2 },
    { name: 'Ervilha em Conserva', category: 'Outros', unit: 'un', minQuantity: 2 },
    { name: 'Atum em Lata', category: 'Outros', unit: 'un', minQuantity: 2 },
    { name: 'Sardinha em Lata', category: 'Outros', unit: 'un', minQuantity: 2 },
    { name: 'Azeitona', category: 'Outros', unit: 'un', minQuantity: 1 },
    { name: 'Palmito', category: 'Outros', unit: 'un', minQuantity: 1 },
    { name: 'Leite de Coco', category: 'Outros', unit: 'un', minQuantity: 1 },
    { name: 'Peito de Frango / Filé', category: 'Outros', unit: 'kg', minQuantity: 2 },
    { name: 'Carne Bovina Moída', category: 'Outros', unit: 'kg', minQuantity: 2 },
    { name: 'Linguiça / Salsicha', category: 'Outros', unit: 'kg', minQuantity: 1 },
    { name: 'Bacon', category: 'Outros', unit: 'kg', minQuantity: 1 },
    { name: 'Hambúrguer Congelado', category: 'Outros', unit: 'pct', minQuantity: 1 },
    { name: 'Batata Congelada', category: 'Outros', unit: 'pct', minQuantity: 1 },
    { name: 'Pão de Queijo', category: 'Outros', unit: 'pct', minQuantity: 1 }
  ];

  // ==========================================
  // 2. ESTADOS DO APLICATIVO
  // ==========================================
  const [items, setItems] = useState([
    { id: 1, name: 'Arroz', category: 'Grãos', quantity: 0, minQuantity: 1, unit: 'pct', expiryDate: '2026-08-15', addedBy: 'Vitor' },
    { id: 2, name: 'Feijão Carioca', category: 'Grãos', quantity: 1, minQuantity: 2, unit: 'pct', expiryDate: '2026-05-10', addedBy: 'Ana' },
    { id: 3, name: 'Leite Integral', category: 'Laticínios', quantity: 8, minQuantity: 6, unit: 'un', expiryDate: '2026-03-12', addedBy: 'Carlos' }
  ]);

  const [shoppingList] = useState([
    { id: 101, name: 'Arroz', quantityNeeded: 1, checked: false }
  ]);

  const [residents] = useState([
    { id: 1, name: 'Vitor', avatar: '👨‍💻', balance: '+ R$ 15,00' },
    { id: 2, name: 'Ana', avatar: '👩‍🔬', balance: '- R$ 10,00' },
    { id: 3, name: 'Carlos', avatar: '👨‍🎨', balance: 'R$ 0,00' }
  ]);

  // Modais estilo Popup
  const [activePopup, setActivePopup] = useState(null); // 'shopping' | 'residents' | null
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
  // 3. FUNÇÕES DE NORMALIZAÇÃO E BUSCA
  // ==========================================
  const normalizeText = (text) => {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  };

  const query = normalizeText(newItem.name.trim());
  const matchingPresets = query === '' ? [] : PRESET_PRODUCTS
    .filter(p => normalizeText(p.name).includes(query))
    .sort((a, b) => {
      const nameA = normalizeText(a.name);
      const nameB = normalizeText(b.name);
      const startsWithA = nameA.startsWith(query);
      const startsWithB = nameB.startsWith(query);
      if (startsWithA && !startsWithB) return -1;
      if (!startsWithA && startsWithB) return 1;
      return a.name.localeCompare(b.name, 'pt-BR');
    })
    .slice(0, 4);

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

  // Ordenação por Urgência (Vermelho > Amarelo > Verde)
  const filteredItems = items
    .filter(item => {
      const matchesSearch = normalizeText(item.name).includes(normalizeText(searchTerm));
      const matchesCategory = selectedCategory === 'Todos' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      const getUrgencyLevel = (item) => {
        if (item.quantity === 0) return 1;
        if (item.quantity <= item.minQuantity) return 2;
        return 3;
      };
      const urgencyA = getUrgencyLevel(a);
      const urgencyB = getUrgencyLevel(b);
      if (urgencyA !== urgencyB) return urgencyA - urgencyB;
      return a.name.localeCompare(b.name, 'pt-BR');
    });

  // ==========================================
  // 4. INTERFACE GRÁFICA COM SIDEBAR ESTILO VS CODE
  // ==========================================
  return (
    <div className="flex h-screen bg-slate-50 text-slate-800 font-sans overflow-hidden">
      
      {/* SIDEBAR ESTILO VS CODE (FIXA NA ESQUERDA) */}
      <aside className="w-16 md:w-20 bg-slate-900 text-slate-400 flex flex-col justify-between items-center py-4 border-r border-slate-800 shrink-0 z-40">
        
        {/* Topo / Logo */}
        <div className="flex flex-col items-center gap-6 w-full">
          <div className="bg-indigo-600 p-3 rounded-2xl text-white shadow-lg shadow-indigo-900/50">
            <Package className="w-6 h-6" />
          </div>

          {/* Botões de Ação na Esquerda */}
          <nav className="flex flex-col gap-3 w-full px-2">
            
            {/* Botão Despensa (Visão Principal) */}
            <button
              onClick={() => setActivePopup(null)}
              className={`flex flex-col items-center justify-center p-3 rounded-2xl transition-all group relative ${
                activePopup === null ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30' : 'hover:bg-slate-800 hover:text-slate-200'
              }`}
              title="Despensa"
            >
              <LayoutGrid className="w-5 h-5" />
              <span className="text-[10px] font-bold mt-1 hidden md:block">Despensa</span>
              {activePopup === null && <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-indigo-500 rounded-r-full" />}
            </button>

            {/* Botão Compras (Popup) */}
            <button
              onClick={() => setActivePopup(activePopup === 'shopping' ? null : 'shopping')}
              className={`flex flex-col items-center justify-center p-3 rounded-2xl transition-all group relative ${
                activePopup === 'shopping' ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30' : 'hover:bg-slate-800 hover:text-slate-200'
              }`}
              title="Lista de Compras"
            >
              <div className="relative">
                <ShoppingCart className="w-5 h-5" />
                {shoppingList.length > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-rose-500 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-black">
                    {shoppingList.length}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-bold mt-1 hidden md:block">Compras</span>
              {activePopup === 'shopping' && <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-indigo-500 rounded-r-full" />}
            </button>

            {/* Botão Moradores (Popup) */}
            <button
              onClick={() => setActivePopup(activePopup === 'residents' ? null : 'residents')}
              className={`flex flex-col items-center justify-center p-3 rounded-2xl transition-all group relative ${
                activePopup === 'residents' ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30' : 'hover:bg-slate-800 hover:text-slate-200'
              }`}
              title="Moradores"
            >
              <Users className="w-5 h-5" />
              <span className="text-[10px] font-bold mt-1 hidden md:block">Moradores</span>
              {activePopup === 'residents' && <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-indigo-500 rounded-r-full" />}
            </button>
          </nav>
        </div>

        {/* Botão Adicionar Item no Rodapé da Sidebar */}
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-500 text-white p-3 rounded-2xl transition-all shadow-md active:scale-95 flex flex-col items-center"
          title="Adicionar Item"
        >
          <Plus className="w-5 h-5" />
          <span className="text-[9px] font-bold mt-0.5 hidden md:block">Novo</span>
        </button>
      </aside>

      {/* ÁREA PRINCIPAL DA DESPENSA (Fica sempre visível ao fundo) */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8 relative">
        
        {/* Cabeçalho Interno */}
        <div className="max-w-6xl mx-auto mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight flex items-center gap-2">
              Dispensa Virtual <span className="text-xs bg-indigo-100 text-indigo-700 font-bold px-2.5 py-0.5 rounded-full">Acadêmico</span>
            </h1>
            <p className="text-xs text-slate-400">Gestão inteligente de mantimentos e tarefas da casa</p>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-2xl text-sm font-bold shadow-md shadow-indigo-200 transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" /> Novo Item
          </button>
        </div>

        <div className="max-w-6xl mx-auto space-y-6">
          
          {/* Barra de Pesquisa */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Pesquisar mantimento..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          {/* Categorias e Limpeza */}
          <div className="flex items-center justify-between gap-2 overflow-x-auto pb-2 scrollbar-none">
            <div className="flex gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {(selectedCategory !== 'Todos' || searchTerm !== '') && (
              <button
                onClick={() => { setSelectedCategory('Todos'); setSearchTerm(''); }}
                className="flex items-center gap-1.5 px-3 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-2xl text-xs font-bold whitespace-nowrap transition-all"
              >
                <X className="w-3.5 h-3.5" /> Mostrar Tudo
              </button>
            )}
          </div>

          {/* Grid de Produtos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredItems.map((item) => {
              const isCritical = item.quantity === 0;
              const isLow = item.quantity > 0 && item.quantity <= item.minQuantity;

              let cardStyle = "bg-white border-slate-100";
              let badgeContent = null;

              if (isCritical) {
                cardStyle = "border-rose-300 bg-rose-50/40 shadow-md ring-2 ring-rose-400/20";
                badgeContent = (
                  <span className="flex items-center gap-1 text-[10px] font-black text-rose-700 bg-rose-100 px-2.5 py-1 rounded-xl uppercase tracking-wider animate-pulse">
                    <AlertTriangle className="w-3.5 h-3.5" /> Estoque Zerado
                  </span>
                );
              } else if (isLow) {
                cardStyle = "border-amber-300 bg-amber-50/30";
                badgeContent = (
                  <span className="flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-xl">
                    <AlertTriangle className="w-3 h-3" /> Estoque Baixo
                  </span>
                );
              } else {
                cardStyle = "border-emerald-200 bg-white";
                badgeContent = (
                  <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-xl">
                    <CheckCircle2 className="w-3 h-3" /> Estoque OK
                  </span>
                );
              }

              return (
                <div key={item.id} className={`p-5 rounded-3xl border transition-all hover:shadow-md flex flex-col justify-between ${cardStyle}`}>
                  <div>
                    <div className="flex justify-between items-start gap-2 mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 bg-slate-100 text-slate-600 rounded-xl">
                        {item.category}
                      </span>
                      {badgeContent}
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
      </main>

      {/* POPUP / MODAL: LISTA DE COMPRAS */}
      {activePopup === 'shopping' && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl animate-in fade-in zoom-in duration-200 border border-slate-100">
            <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-indigo-100 text-indigo-700 rounded-xl">
                  <ShoppingCart className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">Lista de Compras Automática</h3>
                  <p className="text-xs text-slate-400">Itens urgentes ou zerados no estoque</p>
                </div>
              </div>
              <button 
                onClick={() => setActivePopup(null)}
                className="p-2 text-slate-400 hover:bg-slate-100 rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
              {items.filter(i => i.quantity <= i.minQuantity).length === 0 ? (
                <p className="text-center py-8 text-xs font-semibold text-slate-400">Tudo abastecido! Nenhum item em falta no momento. 🎉</p>
              ) : (
                items.filter(i => i.quantity <= i.minQuantity).map((shopItem) => (
                  <div key={shopItem.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div>
                      <h4 className="font-bold text-sm text-slate-800">{shopItem.name}</h4>
                      <p className="text-[11px] text-slate-400">Atual: {shopItem.quantity} {shopItem.unit} (Mínimo: {shopItem.minQuantity})</p>
                    </div>
                    <span className="text-xs font-bold bg-rose-100 text-rose-700 px-3 py-1 rounded-xl">
                      Comprar urgente
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* POPUP / MODAL: MORADORES */}
      {activePopup === 'residents' && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl animate-in fade-in zoom-in duration-200 border border-slate-100">
            <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-indigo-100 text-indigo-700 rounded-xl">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">Moradores & Divisão de Contas</h3>
                  <p className="text-xs text-slate-400">Saldos da república</p>
                </div>
              </div>
              <button 
                onClick={() => setActivePopup(null)}
                className="p-2 text-slate-400 hover:bg-slate-100 rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              {residents.map((res) => (
                <div key={res.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{res.avatar}</span>
                    <div>
                      <h4 className="font-bold text-sm text-slate-800">{res.name}</h4>
                      <p className="text-xs text-slate-400">Morador Ativo</p>
                    </div>
                  </div>
                  <span className="text-xs font-black px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-700">
                    {res.balance}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MODAL DE ADICIONAR ITEM */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Adicionar Novo Mantimento</h3>
            
            <form onSubmit={handleAddItem} className="space-y-4">
              <div className="relative">
                <label className="block text-xs font-bold text-slate-600 mb-1 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600" /> Nome do Item
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Arroz, Frango, Leite..."
                  value={newItem.name}
                  onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />

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
                    step="any"
                    value={newItem.quantity}
                    onChange={(e) => setNewItem({...newItem, quantity: e.target.value})}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Unidade de Medida</label>
                  <div className="flex bg-slate-100 p-1 rounded-xl gap-1 border border-slate-200">
                    {['un', 'kg', 'pct', 'cx'].map((u) => (
                      <button
                        key={u}
                        type="button"
                        onClick={() => setNewItem({...newItem, unit: u})}
                        className={`flex-1 py-1.5 rounded-lg text-xs font-bold uppercase transition-all ${
                          newItem.unit === u ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {u}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Estoque Mínimo Alerta</label>
                <input
                  type="number"
                  min="0"
                  value={newItem.minQuantity}
                  onChange={(e) => setNewItem({...newItem, minQuantity: e.target.value})}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
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