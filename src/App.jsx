import { useState } from 'react';
import { 
  Package, ShoppingCart, Users, AlertTriangle, CheckCircle2, 
  Plus, Minus, Trash2, Calendar, Search, Sparkles, X, LayoutGrid,
  Mail, KeyRound, UserPlus, RefreshCcw, DollarSign, Split, Edit3, Save,
  UserX, ShieldAlert
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
    { id: 1, name: 'Arroz', category: 'Grãos', quantity: 2, minQuantity: 1, unit: 'pct', price: 26.00, splitCount: 1, expiryDate: '2026-08-15', addedBy: 'Admin' }
  ]);

  const [shoppingList] = useState([
    { id: 101, name: 'Arroz', quantityNeeded: 1, checked: false }
  ]);

  // Iniciando com lista vazia de moradores (do zero)
  const [residents, setResidents] = useState([]);

  const [activePopup, setActivePopup] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // Estados de convite por e-mail
  const [inviteStep, setInviteStep] = useState(1);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteName, setInviteName] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [inputCode, setInputCode] = useState('');
  const [inviteError, setInviteError] = useState('');

  const [newItem, setNewItem] = useState({
    name: '',
    category: 'Grãos',
    quantity: 1,
    minQuantity: 1,
    unit: 'un',
    price: '',
    splitCount: 1,
    expiryDate: '',
    addedBy: 'Admin'
  });

  const categories = ['Todos', 'Grãos', 'Laticínios', 'Temperos', 'Bebidas', 'Limpeza', 'Outros'];

  // ==========================================
  // 3. FUNÇÕES DE SUPORTE E LÓGICA
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
      minQuantity: Number(newItem.minQuantity),
      price: newItem.price ? Number(newItem.price) : 0,
      splitCount: Number(newItem.splitCount)
    };

    setItems([...items, itemToAdd]);
    setNewItem({ name: '', category: 'Grãos', quantity: 1, minQuantity: 1, unit: 'un', price: '', splitCount: 1, expiryDate: '', addedBy: 'Admin' });
    setIsAddModalOpen(false);
  };

  const handleUpdateItem = (e) => {
    e.preventDefault();
    if (!editingItem) return;

    setItems(items.map(item => item.id === editingItem.id ? {
      ...editingItem,
      quantity: Number(editingItem.quantity),
      minQuantity: Number(editingItem.minQuantity),
      price: editingItem.price ? Number(editingItem.price) : 0,
      splitCount: Number(editingItem.splitCount)
    } : item));

    setEditingItem(null);
  };

  const handleSendInviteCode = (e) => {
    e.preventDefault();
    if (!inviteEmail || !inviteName) return;

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCode(code);
    setInviteStep(2);
    setInviteError('');

    alert(`⚡ [Código de Validação por E-mail]\n\nE-mail: ${inviteEmail}\nSeu código de acesso: ${code}`);
  };

  const handleVerifyCode = (e) => {
    e.preventDefault();
    if (inputCode === generatedCode) {
      const avatars = ['🧑‍💻', '👩‍💻', '👨‍🌾', '👩‍🍳', '👨‍🎓', '👩‍🎨'];
      const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)];

      const newResident = {
        id: Date.now(),
        name: inviteName,
        email: inviteEmail,
        avatar: randomAvatar
      };

      setResidents([...residents, newResident]);
      setInviteStep(1);
      setInviteEmail('');
      setInviteName('');
      setInputCode('');
      setGeneratedCode('');
      alert('✅ Morador validado e adicionado com sucesso!');
    } else {
      setInviteError('Código incorreto. Tente novamente.');
    }
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

  // Cálculo Dinâmico de Saldos
  const calculateResidentBalance = () => {
    let totalOwed = 0;
    items.forEach(item => {
      const price = item.price ? Number(item.price) : 0;
      const split = item.splitCount > 1 ? item.splitCount : 1;
      if (price > 0 && split > 1 && residents.length >= split) {
        totalOwed += price / split;
      }
    });
    return residents.length > 0 ? totalOwed / residents.length : 0;
  };

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
  // 4. INTERFACE GRÁFICA
  // ==========================================
  return (
    <div className="flex h-screen bg-slate-50 text-slate-800 font-sans overflow-hidden">
      
      {/* SIDEBAR ESTILO VS CODE */}
      <aside className="w-16 md:w-20 bg-slate-900 text-slate-400 flex flex-col justify-between items-center py-4 border-r border-slate-800 shrink-0 z-40">
        <div className="flex flex-col items-center gap-6 w-full">
          <div className="bg-indigo-600 p-3 rounded-2xl text-white shadow-lg shadow-indigo-900/50">
            <Package className="w-6 h-6" />
          </div>

          <nav className="flex flex-col gap-3 w-full px-2">
            <button
              onClick={() => setActivePopup(null)}
              className={`flex flex-col items-center justify-center p-3 rounded-2xl transition-all relative ${
                activePopup === null ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30' : 'hover:bg-slate-800 hover:text-slate-200'
              }`}
              title="Despensa"
            >
              <LayoutGrid className="w-5 h-5" />
              <span className="text-[10px] font-bold mt-1 hidden md:block">Despensa</span>
              {activePopup === null && <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-indigo-500 rounded-r-full" />}
            </button>

            <button
              onClick={() => setActivePopup(activePopup === 'shopping' ? null : 'shopping')}
              className={`flex flex-col items-center justify-center p-3 rounded-2xl transition-all relative ${
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

            <button
              onClick={() => setActivePopup(activePopup === 'residents' ? null : 'residents')}
              className={`flex flex-col items-center justify-center p-3 rounded-2xl transition-all relative ${
                activePopup === 'residents' ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30' : 'hover:bg-slate-800 hover:text-slate-200'
              }`}
              title="Moradores"
            >
              <div className="relative">
                <Users className="w-5 h-5" />
                <span className="absolute -top-1.5 -right-2 bg-indigo-500 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-black">
                  {residents.length}
                </span>
              </div>
              <span className="text-[10px] font-bold mt-1 hidden md:block">Moradores</span>
              {activePopup === 'residents' && <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-indigo-500 rounded-r-full" />}
            </button>
          </nav>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-500 text-white p-3 rounded-2xl transition-all shadow-md active:scale-95 flex flex-col items-center"
          title="Adicionar Item"
        >
          <Plus className="w-5 h-5" />
          <span className="text-[9px] font-bold mt-0.5 hidden md:block">Novo</span>
        </button>
      </aside>

      {/* ÁREA PRINCIPAL DA DESPENSA */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8 relative">
        <div className="max-w-6xl mx-auto mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight flex items-center gap-2">
              Dispensa Virtual <span className="text-xs bg-indigo-100 text-indigo-700 font-bold px-2.5 py-0.5 rounded-full">Acadêmico</span>
            </h1>
            <p className="text-xs text-slate-400">Gestão inteligente de mantimentos e divisão de custos</p>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-2xl text-sm font-bold shadow-md shadow-indigo-200 transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" /> Novo Item
          </button>
        </div>

        <div className="max-w-6xl mx-auto space-y-6">
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

              const unitPrice = item.price ? Number(item.price) : 0;
              const split = item.splitCount > 1 ? item.splitCount : 1;
              const pricePerPerson = unitPrice > 0 ? (unitPrice / split).toFixed(2) : '0,00';

              return (
                <div key={item.id} className={`p-5 rounded-3xl border transition-all hover:shadow-md flex flex-col justify-between ${cardStyle}`}>
                  <div>
                    <div className="flex justify-between items-start gap-2 mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 bg-slate-100 text-slate-600 rounded-xl">
                        {item.category}
                      </span>
                      {badgeContent}
                    </div>

                    <div className="flex justify-between items-start gap-2 mb-1">
                      <h3 className="font-bold text-slate-800 text-base">{item.name}</h3>
                      <button 
                        onClick={() => setEditingItem(item)}
                        className="text-slate-400 hover:text-indigo-600 p-1.5 rounded-lg hover:bg-indigo-50 transition-all"
                        title="Editar produto"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      {unitPrice > 0 && (
                        <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100 flex items-center gap-1">
                          <DollarSign className="w-3 h-3" /> R$ {unitPrice.toFixed(2)}
                        </span>
                      )}
                      {split > 1 && (
                        <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-1 rounded-lg border border-indigo-100 flex items-center gap-1">
                          <Split className="w-3 h-3" /> Div: {split}p (R$ {pricePerPerson}/pes)
                        </span>
                      )}
                    </div>

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

      {/* POPUP: COMPRAS */}
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
              <button onClick={() => setActivePopup(null)} className="p-2 text-slate-400 hover:bg-slate-100 rounded-xl">
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
                    <span className="text-xs font-bold bg-rose-100 text-rose-700 px-3 py-1 rounded-xl">Comprar urgente</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* POPUP: MORADORES & ESTADOS VAZIOS INTELIGENTES (BOTÕES FANTASMAS) */}
      {activePopup === 'residents' && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl animate-in fade-in zoom-in duration-200 border border-slate-100">
            <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-indigo-100 text-indigo-700 rounded-xl">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">Moradores & Divisão de Custos</h3>
                  <p className="text-xs text-slate-400">Gerencie os membros da república</p>
                </div>
              </div>
              <button onClick={() => setActivePopup(null)} className="p-2 text-slate-400 hover:bg-slate-100 rounded-xl">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* SEÇÃO DE CONVITE */}
            <div className="mb-6 p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100">
              <h4 className="font-bold text-xs text-indigo-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <UserPlus className="w-4 h-4 text-indigo-600" /> Adicionar Novo Morador
              </h4>

              {inviteStep === 1 ? (
                <form onSubmit={handleSendInviteCode} className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      required
                      placeholder="Nome do morador"
                      value={inviteName}
                      onChange={(e) => setInviteName(e.target.value)}
                      className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                    />
                    <input
                      type="email"
                      required
                      placeholder="E-mail (ex: lucas@gmail.com)"
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                      className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-xl text-xs font-bold transition-all"
                  >
                    <Mail className="w-3.5 h-3.5" /> Enviar Código de Validação
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyCode} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-slate-600">
                      Código enviado para <span className="font-bold text-indigo-700">{inviteEmail}</span>
                    </p>
                    <button
                      type="button"
                      onClick={handleSendInviteCode}
                      className="flex items-center gap-1 text-[11px] font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-100 px-2.5 py-1 rounded-lg transition-all"
                    >
                      <RefreshCcw className="w-3 h-3" /> Enviar Novamente
                    </button>
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      required
                      maxLength="6"
                      placeholder="Código (6 dígitos)"
                      value={inputCode}
                      onChange={(e) => setInputCode(e.target.value)}
                      className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-mono font-bold tracking-widest text-center focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                    />
                    <button
                      type="submit"
                      className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1"
                    >
                      <KeyRound className="w-3.5 h-3.5" /> Confirmar
                    </button>
                  </div>
                  {inviteError && <p className="text-[11px] font-bold text-rose-600">{inviteError}</p>}
                </form>
              )}
            </div>

            {/* LISTA DE MORADORES COM ESTADOS VAZIOS (BOTÕES FANTASMAS) */}
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {residents.length === 0 ? (
                /* Estado Vazio Absoluto (Nenhum morador) */
                <div className="text-center py-8 px-4 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                  <UserX className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <h4 className="font-bold text-sm text-slate-700">Nenhum morador cadastrado</h4>
                  <p className="text-xs text-slate-400 mt-1">Adicione pelo menos 2 moradores para habilitar a divisão automática de custos.</p>
                </div>
              ) : residents.length === 1 ? (
                /* Estado com Apenas 1 Morador (Divisão Indisponível - Botão Fantasma / Aviso) */
                <div className="space-y-3">
                  <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 flex items-start gap-3">
                    <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-xs text-amber-800 uppercase tracking-wider">Divisão Indisponível</h4>
                      <p className="text-xs text-amber-700 mt-0.5">
                        Você cadastrou apenas 1 morador. A divisão de custos exige no mínimo <span className="font-bold">2 pessoas</span> para funcionar. Convide mais um colega acima!
                      </p>
                    </div>
                  </div>

                  {residents.map((res) => (
                    <div key={res.id} className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-100 opacity-75">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{res.avatar}</span>
                        <div>
                          <h4 className="font-bold text-sm text-slate-800">{res.name}</h4>
                          <p className="text-[11px] text-slate-400">{res.email}</p>
                        </div>
                      </div>
                      <span className="text-[11px] font-bold px-3 py-1.5 rounded-xl bg-slate-200 text-slate-600">
                        Divisão pausada (1 pes.)
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                /* 2 ou mais moradores: Exibe os saldos calculados perfeitamente */
                residents.map((res) => {
                  const userShare = calculateResidentBalance();
                  return (
                    <div key={res.id} className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{res.avatar}</span>
                        <div>
                          <h4 className="font-bold text-sm text-slate-800">{res.name}</h4>
                          <p className="text-[11px] text-slate-400">{res.email}</p>
                        </div>
                      </div>
                      <span className="text-xs font-black px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-700">
                        Cota: R$ {userShare.toFixed(2)}
                      </span>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODAL DE EDIÇÃO DIRETA DE PRODUTO */}
      {editingItem && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Edit3 className="w-5 h-5 text-indigo-600" /> Editar Mantimento
            </h3>
            
            <form onSubmit={handleUpdateItem} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Nome do Item</label>
                <input
                  type="text"
                  required
                  value={editingItem.name}
                  onChange={(e) => setEditingItem({...editingItem, name: e.target.value})}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Quantidade</label>
                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={editingItem.quantity}
                    onChange={(e) => setEditingItem({...editingItem, quantity: e.target.value})}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Estoque Mínimo</label>
                  <input
                    type="number"
                    min="0"
                    value={editingItem.minQuantity}
                    onChange={(e) => setEditingItem({...editingItem, minQuantity: e.target.value})}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Preço Total (R$)</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={editingItem.price || ''}
                    onChange={(e) => setEditingItem({...editingItem, price: e.target.value})}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Divisão (Pessoas)</label>
                  <select
                    value={editingItem.splitCount || 1}
                    onChange={(e) => setEditingItem({...editingItem, splitCount: Number(e.target.value)})}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  >
                    <option value={1}>Não dividir (1)</option>
                    {Array.from({ length: Math.max(1, residents.length) }, (_, i) => i + 2).map((num) => (
                      <option key={num} value={num}>Dividir entre {num}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Validade</label>
                <input
                  type="date"
                  value={editingItem.expiryDate || ''}
                  onChange={(e) => setEditingItem({...editingItem, expiryDate: e.target.value})}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 text-sm font-bold text-slate-500 hover:bg-slate-100 rounded-xl"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-5 py-2 text-sm font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md"
                >
                  <Save className="w-4 h-4" /> Salvar Alterações
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL DE ADICIONAR NOVO ITEM */}
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

              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1 flex items-center gap-1">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-600" /> Preço Total (R$)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="Ex: 25.00"
                    value={newItem.price}
                    onChange={(e) => setNewItem({...newItem, price: e.target.value})}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1 flex items-center gap-1">
                    <Split className="w-3.5 h-3.5 text-indigo-600" /> Dividir entre
                  </label>
                  <select
                    value={newItem.splitCount}
                    onChange={(e) => setNewItem({...newItem, splitCount: Number(e.target.value)})}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  >
                    <option value={1}>Não dividir (1)</option>
                    {Array.from({ length: Math.max(1, residents.length) }, (_, i) => i + 2).map((num) => (
                      <option key={num} value={num}>Dividir entre {num}</option>
                    ))}
                  </select>
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