"use client";

import { useState, useEffect } from "react";
import { Upload, Plus, X, Edit2, Check, Trash2, ChevronDown, ChevronUp, Download, UploadCloud, Palette } from "lucide-react";

// Import Google Fonts
if (typeof window !== 'undefined') {
  const link = document.createElement('link');
  link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:wght@700&display=swap';
  link.rel = 'stylesheet';
  document.head.appendChild(link);
}

type Character = {
  id: string;
  name: string;
  age: string;
  gender: string;
  image: string;
  lore: string;
};

type Story = {
  id: string;
  title: string;
  content: string;
};

type Event = {
  id: string;
  title: string;
  description: string;
};

type Rule = {
  id: string;
  title: string;
  description: string;
};

type Artifact = {
  id: string;
  title: string;
  description: string;
  image: string;
};

type Additional = {
  id: string;
  title: string;
  content: string;
};

type CustomCategory = {
  id: string;
  name: string;
  type: "image-text" | "text-only";
  items: Array<{
    id: string;
    title: string;
    description: string;
    image?: string;
  }>;
};

export default function WorldbuildingApp() {
  const [hue, setHue] = useState(330);
  const [imageSize, setImageSize] = useState<"pequeno" | "medio" | "grande">("medio");
  const [showThemePicker, setShowThemePicker] = useState(false);
  const [activeSection, setActiveSection] = useState("characters");
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryType, setNewCategoryType] = useState<"image-text" | "text-only">("image-text");
  const [editMode, setEditMode] = useState(false);
  
  const [characters, setCharacters] = useState<Character[]>([]);
  const [stories, setStories] = useState<Story[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [rules, setRules] = useState<Rule[]>([]);
  const [artifacts, setArtifacts] = useState<Artifact[]>([]);
  const [additional, setAdditional] = useState<Additional[]>([]);
  const [customCategories, setCustomCategories] = useState<CustomCategory[]>([]);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingField, setEditingField] = useState<string | null>(null);

  // Load data from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem("worldbuilding-data");
    if (savedData) {
      const data = JSON.parse(savedData);
      setCharacters(data.characters || []);
      setStories(data.stories || []);
      setEvents(data.events || []);
      setRules(data.rules || []);
      setArtifacts(data.artifacts || []);
      setAdditional(data.additional || []);
      setCustomCategories(data.customCategories || []);
      setHue(data.hue || 330);
      setImageSize(data.imageSize || "medio");
    }
  }, []);

  // Save data to localStorage
  useEffect(() => {
    const data = {
      characters,
      stories,
      events,
      rules,
      artifacts,
      additional,
      customCategories,
      hue,
      imageSize,
    };
    localStorage.setItem("worldbuilding-data", JSON.stringify(data));
  }, [characters, stories, events, rules, artifacts, additional, customCategories, hue, imageSize]);

  const exportData = () => {
    const data = {
      characters,
      stories,
      events,
      rules,
      artifacts,
      additional,
      customCategories,
      hue,
      imageSize,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "worldbuilding-data.json";
    a.click();
  };

  const importData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);
        setCharacters(data.characters || []);
        setStories(data.stories || []);
        setEvents(data.events || []);
        setRules(data.rules || []);
        setArtifacts(data.artifacts || []);
        setAdditional(data.additional || []);
        setCustomCategories(data.customCategories || []);
        setHue(data.hue || 330);
        setImageSize(data.imageSize || "medio");
      } catch (error) {
        alert("Erro ao importar dados");
      }
    };
    reader.readAsText(file);
  };

  const addCharacter = () => {
    const newChar: Character = {
      id: Date.now().toString(),
      name: "Novo Personagem",
      age: "25",
      gender: "Indefinido",
      image: "",
      lore: "História do personagem...",
    };
    setCharacters([...characters, newChar]);
  };

  const addStory = () => {
    const newStory: Story = {
      id: Date.now().toString(),
      title: "Nova História",
      content: "Conteúdo da história...",
    };
    setStories([...stories, newStory]);
  };

  const addEvent = () => {
    const newEvent: Event = {
      id: Date.now().toString(),
      title: "Novo Acontecimento",
      description: "Descrição do acontecimento...",
    };
    setEvents([...events, newEvent]);
  };

  const addRule = () => {
    const newRule: Rule = {
      id: Date.now().toString(),
      title: "Nova Regra",
      description: "Descrição da regra...",
    };
    setRules([...rules, newRule]);
  };

  const addArtifact = () => {
    const newArtifact: Artifact = {
      id: Date.now().toString(),
      title: "Novo Artefato",
      description: "Descrição do artefato...",
      image: "",
    };
    setArtifacts([...artifacts, newArtifact]);
  };

  const addAdditional = () => {
    const newAdd: Additional = {
      id: Date.now().toString(),
      title: "Novo Adicional",
      content: "Conteúdo adicional...",
    };
    setAdditional([...additional, newAdd]);
  };

  const deleteItem = (id: string, type: string) => {
    if (type === "character") {
      setCharacters(characters.filter((c) => c.id !== id));
      setSelectedCharacter(null);
      setActiveSection("characters");
    }
    if (type === "story") setStories(stories.filter((s) => s.id !== id));
    if (type === "event") setEvents(events.filter((e) => e.id !== id));
    if (type === "rule") setRules(rules.filter((r) => r.id !== id));
    if (type === "artifact") setArtifacts(artifacts.filter((a) => a.id !== id));
    if (type === "additional") setAdditional(additional.filter((a) => a.id !== id));
  };

  const updateCharacter = (id: string, field: keyof Character, value: string) => {
    setCharacters(characters.map((c) => (c.id === id ? { ...c, [field]: value } : c)));
  };

  const updateStory = (id: string, field: keyof Story, value: string) => {
    setStories(stories.map((s) => (s.id === id ? { ...s, [field]: value } : s)));
  };

  const updateEvent = (id: string, field: keyof Event, value: string) => {
    setEvents(events.map((e) => (e.id === id ? { ...e, [field]: value } : e)));
  };

  const updateRule = (id: string, field: keyof Rule, value: string) => {
    setRules(rules.map((r) => (r.id === id ? { ...r, [field]: value } : r)));
  };

  const updateArtifact = (id: string, field: keyof Artifact, value: any) => {
    setArtifacts(artifacts.map((a) => (a.id === id ? { ...a, [field]: value } : a)));
  };

  const updateAdditional = (id: string, field: keyof Additional, value: string) => {
    setAdditional(additional.map((a) => (a.id === id ? { ...a, [field]: value } : a)));
  };

  const createCustomCategory = () => {
    if (!newCategoryName.trim()) return;
    const newCategory: CustomCategory = {
      id: Date.now().toString(),
      name: newCategoryName,
      type: newCategoryType,
      items: [],
    };
    setCustomCategories([...customCategories, newCategory]);
    setNewCategoryName("");
    setShowCategoryModal(false);
  };

  const deleteCustomCategory = (id: string) => {
    setCustomCategories(customCategories.filter((c) => c.id !== id));
    setActiveSection("characters");
  };

  const addCustomItem = (categoryId: string) => {
    const category = customCategories.find((c) => c.id === categoryId);
    if (!category) return;

    const newItem = {
      id: Date.now().toString(),
      title: "Novo Item",
      description: "Descrição...",
      ...(category.type === "image-text" && { image: "" }),
    };

    setCustomCategories(
      customCategories.map((c) =>
        c.id === categoryId ? { ...c, items: [...c.items, newItem] } : c
      )
    );
  };

  const deleteCustomItem = (categoryId: string, itemId: string) => {
    setCustomCategories(
      customCategories.map((c) =>
        c.id === categoryId ? { ...c, items: c.items.filter((i) => i.id !== itemId) } : c
      )
    );
  };

  const updateCustomItem = (categoryId: string, itemId: string, field: string, value: any) => {
    setCustomCategories(
      customCategories.map((c) =>
        c.id === categoryId
          ? {
              ...c,
              items: c.items.map((i) => (i.id === itemId ? { ...i, [field]: value } : i)),
            }
          : c
      )
    );
  };

  const accentColor = `hsl(${hue}, 65%, 55%)`;
  const accentColorDark = `hsl(${hue}, 60%, 45%)`;
  const accentColorLight = `hsl(${hue}, 70%, 65%)`;
  
  const getImageSize = () => {
    switch(imageSize) {
      case "pequeno": return 150;
      case "medio": return 250;
      case "grande": return 350;
      default: return 250;
    }
  };
  
  const imageSizeValue = getImageSize();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, callback: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      callback(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const renderCharacterList = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-4xl font-bold tracking-tight" style={{ color: accentColorLight, fontFamily: "'Playfair Display', serif" }}>
          Personagens
        </h2>
        {editMode && (
          <button
            onClick={addCharacter}
            className="px-5 py-3 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
            style={{ backgroundColor: accentColor, color: "#fff", fontFamily: "'Inter', sans-serif" }}
          >
            <Plus size={20} /> Adicionar Personagem
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {characters.map((char) => (
          <div
            key={char.id}
            onClick={() => setSelectedCharacter(char.id)}
            className="p-6 rounded-xl cursor-pointer transition-all duration-300 hover:scale-105 border-2"
            style={{
              backgroundColor: "rgba(30, 35, 45, 0.6)",
              borderColor: `${accentColor}40`,
              backdropFilter: "blur(10px)",
            }}
          >
            <div className="flex flex-col items-center gap-4">
              {char.image ? (
                <img
                  src={char.image}
                  alt={char.name}
                  className="rounded-lg object-cover"
                  style={{ width: imageSizeValue, height: imageSizeValue }}
                />
              ) : (
                <div
                  className="rounded-lg flex items-center justify-center"
                  style={{
                    width: imageSizeValue,
                    height: imageSizeValue,
                    backgroundColor: `${accentColor}20`,
                    border: `2px dashed ${accentColor}60`,
                  }}
                >
                  <Upload size={40} style={{ color: `${accentColor}80` }} />
                </div>
              )}
              <h3 className="text-2xl font-bold text-center" style={{ color: "#e5e7eb", fontFamily: "'Inter', sans-serif" }}>
                {char.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCharacterBio = () => {
    const char = characters.find((c) => c.id === selectedCharacter);
    if (!char) return null;

    return (
      <div className="space-y-6">
        <button
          onClick={() => setSelectedCharacter(null)}
          className="px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2"
          style={{ backgroundColor: "rgba(60, 70, 85, 0.5)", color: "#9ca3af" }}
        >
          <X size={18} /> Voltar
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="relative">
              {char.image ? (
                <img
                  src={char.image}
                  alt={char.name}
                  className="w-full rounded-xl object-cover border-2"
                  style={{ maxHeight: "500px", borderColor: `${accentColor}60` }}
                />
              ) : (
                <div
                  className="w-full rounded-xl flex items-center justify-center border-2"
                  style={{
                    height: "500px",
                    backgroundColor: `${accentColor}20`,
                    borderColor: `${accentColor}60`,
                    borderStyle: "dashed",
                  }}
                >
                  <Upload size={60} style={{ color: `${accentColor}80` }} />
                </div>
              )}
              {editMode && (
                <label className="absolute bottom-4 right-4 cursor-pointer">
                  <div
                    className="px-4 py-2 rounded-lg font-medium transition-all shadow-lg flex items-center gap-2"
                    style={{ backgroundColor: accentColor, color: "#fff" }}
                  >
                    <Upload size={18} /> Alterar Imagem
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageUpload(e, (url) => updateCharacter(char.id, "image", url))}
                  />
                </label>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded-xl border-2" style={{ backgroundColor: "rgba(30, 35, 45, 0.6)", borderColor: `${accentColor}40` }}>
              <label className="block text-sm font-medium mb-2" style={{ color: "#9ca3af" }}>
                Nome
              </label>
              {editMode && editingId === char.id && editingField === "name" ? (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={char.name}
                    onChange={(e) => updateCharacter(char.id, "name", e.target.value)}
                    className="flex-1 px-4 py-2 rounded-lg border-2 bg-transparent"
                    style={{ borderColor: accentColor, color: "#e5e7eb" }}
                  />
                  <button
                    onClick={() => {
                      setEditingId(null);
                      setEditingField(null);
                    }}
                    className="px-4 py-2 rounded-lg"
                    style={{ backgroundColor: accentColor, color: "#fff" }}
                  >
                    <Check size={18} />
                  </button>
                </div>
              ) : (
                <div className="flex justify-between items-center">
                  <h3 className="text-3xl font-bold" style={{ color: accentColorLight, fontFamily: "'Playfair Display', serif" }}>
                    {char.name}
                  </h3>
                  {editMode && (
                    <button
                      onClick={() => {
                        setEditingId(char.id);
                        setEditingField("name");
                      }}
                      className="p-2 rounded-lg hover:bg-opacity-80"
                      style={{ backgroundColor: "rgba(60, 70, 85, 0.5)", color: "#9ca3af" }}
                    >
                      <Edit2 size={18} />
                    </button>
                  )}
                </div>
              )}
            </div>

            <div className="p-6 rounded-xl border-2" style={{ backgroundColor: "rgba(30, 35, 45, 0.6)", borderColor: `${accentColor}40` }}>
              <label className="block text-sm font-medium mb-2" style={{ color: "#9ca3af" }}>
                Idade
              </label>
              {editMode && editingId === char.id && editingField === "age" ? (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={char.age}
                    onChange={(e) => updateCharacter(char.id, "age", e.target.value)}
                    className="flex-1 px-4 py-2 rounded-lg border-2 bg-transparent"
                    style={{ borderColor: accentColor, color: "#e5e7eb" }}
                  />
                  <button
                    onClick={() => {
                      setEditingId(null);
                      setEditingField(null);
                    }}
                    className="px-4 py-2 rounded-lg"
                    style={{ backgroundColor: accentColor, color: "#fff" }}
                  >
                    <Check size={18} />
                  </button>
                </div>
              ) : (
                <div className="flex justify-between items-center">
                  <p className="text-xl" style={{ color: "#e5e7eb" }}>
                    {char.age}
                  </p>
                  {editMode && (
                    <button
                      onClick={() => {
                        setEditingId(char.id);
                        setEditingField("age");
                      }}
                      className="p-2 rounded-lg hover:bg-opacity-80"
                      style={{ backgroundColor: "rgba(60, 70, 85, 0.5)", color: "#9ca3af" }}
                    >
                      <Edit2 size={18} />
                    </button>
                  )}
                </div>
              )}
            </div>

            <div className="p-6 rounded-xl border-2" style={{ backgroundColor: "rgba(30, 35, 45, 0.6)", borderColor: `${accentColor}40` }}>
              <label className="block text-sm font-medium mb-2" style={{ color: "#9ca3af" }}>
                Gênero
              </label>
              {editMode && editingId === char.id && editingField === "gender" ? (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={char.gender}
                    onChange={(e) => updateCharacter(char.id, "gender", e.target.value)}
                    className="flex-1 px-4 py-2 rounded-lg border-2 bg-transparent"
                    style={{ borderColor: accentColor, color: "#e5e7eb" }}
                  />
                  <button
                    onClick={() => {
                      setEditingId(null);
                      setEditingField(null);
                    }}
                    className="px-4 py-2 rounded-lg"
                    style={{ backgroundColor: accentColor, color: "#fff" }}
                  >
                    <Check size={18} />
                  </button>
                </div>
              ) : (
                <div className="flex justify-between items-center">
                  <p className="text-xl" style={{ color: "#e5e7eb" }}>
                    {char.gender}
                  </p>
                  {editMode && (
                    <button
                      onClick={() => {
                        setEditingId(char.id);
                        setEditingField("gender");
                      }}
                      className="p-2 rounded-lg hover:bg-opacity-80"
                      style={{ backgroundColor: "rgba(60, 70, 85, 0.5)", color: "#9ca3af" }}
                    >
                      <Edit2 size={18} />
                    </button>
                  )}
                </div>
              )}
            </div>

            <div className="p-6 rounded-xl border-2" style={{ backgroundColor: "rgba(30, 35, 45, 0.6)", borderColor: `${accentColor}40` }}>
              <label className="block text-sm font-medium mb-2" style={{ color: "#9ca3af" }}>
                História
              </label>
              {editMode && editingId === char.id && editingField === "lore" ? (
                <div className="space-y-2">
                  <textarea
                    value={char.lore}
                    onChange={(e) => updateCharacter(char.id, "lore", e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border-2 bg-transparent min-h-[200px]"
                    style={{ borderColor: accentColor, color: "#e5e7eb" }}
                  />
                  <button
                    onClick={() => {
                      setEditingId(null);
                      setEditingField(null);
                    }}
                    className="px-4 py-2 rounded-lg"
                    style={{ backgroundColor: accentColor, color: "#fff" }}
                  >
                    <Check size={18} />
                  </button>
                </div>
              ) : (
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-base leading-relaxed" style={{ color: "#d1d5db" }}>
                      {char.lore}
                    </p>
                    {editMode && (
                      <button
                        onClick={() => {
                          setEditingId(char.id);
                          setEditingField("lore");
                        }}
                        className="p-2 rounded-lg hover:bg-opacity-80"
                        style={{ backgroundColor: "rgba(60, 70, 85, 0.5)", color: "#9ca3af" }}
                      >
                        <Edit2 size={18} />
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {editMode && (
              <button
                onClick={() => deleteItem(char.id, "character")}
                className="w-full px-5 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
                style={{ backgroundColor: "rgba(220, 38, 38, 0.8)", color: "#fff" }}
              >
                <Trash2 size={20} /> Deletar Personagem
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderStories = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-4xl font-bold tracking-tight" style={{ color: accentColorLight, fontFamily: "'Playfair Display', serif" }}>
          História Principal
        </h2>
        {editMode && (
          <button
            onClick={addStory}
            className="px-5 py-3 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
            style={{ backgroundColor: accentColor, color: "#fff", fontFamily: "'Inter', sans-serif" }}
          >
            <Plus size={20} /> Adicionar História
          </button>
        )}
      </div>
      <div className="space-y-4">
        {stories.map((story) => (
          <div
            key={story.id}
            className="p-6 rounded-xl border-2"
            style={{ backgroundColor: "rgba(30, 35, 45, 0.6)", borderColor: `${accentColor}40` }}
          >
            <div className="flex justify-between items-start mb-4">
              {editMode && editingId === story.id && editingField === "title" ? (
                <div className="flex-1 flex gap-2">
                  <input
                    type="text"
                    value={story.title}
                    onChange={(e) => updateStory(story.id, "title", e.target.value)}
                    className="flex-1 px-4 py-2 rounded-lg border-2 bg-transparent"
                    style={{ borderColor: accentColor, color: "#e5e7eb" }}
                  />
                  <button
                    onClick={() => {
                      setEditingId(null);
                      setEditingField(null);
                    }}
                    className="px-4 py-2 rounded-lg"
                    style={{ backgroundColor: accentColor, color: "#fff" }}
                  >
                    <Check size={18} />
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="text-2xl font-bold" style={{ color: accentColorLight, fontFamily: "'Inter', sans-serif" }}>
                    {story.title}
                  </h3>
                  {editMode && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditingId(story.id);
                          setEditingField("title");
                        }}
                        className="p-2 rounded-lg hover:bg-opacity-80"
                        style={{ backgroundColor: "rgba(60, 70, 85, 0.5)", color: "#9ca3af" }}
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => deleteItem(story.id, "story")}
                        className="p-2 rounded-lg hover:bg-opacity-80"
                        style={{ backgroundColor: "rgba(220, 38, 38, 0.8)", color: "#fff" }}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
            {editMode && editingId === story.id && editingField === "content" ? (
              <div className="space-y-2">
                <textarea
                  value={story.content}
                  onChange={(e) => updateStory(story.id, "content", e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border-2 bg-transparent min-h-[150px]"
                  style={{ borderColor: accentColor, color: "#e5e7eb" }}
                />
                <button
                  onClick={() => {
                    setEditingId(null);
                    setEditingField(null);
                  }}
                  className="px-4 py-2 rounded-lg"
                  style={{ backgroundColor: accentColor, color: "#fff" }}
                >
                  <Check size={18} />
                </button>
              </div>
            ) : (
              <div className="flex justify-between items-start">
                <p className="text-base leading-relaxed" style={{ color: "#d1d5db" }}>
                  {story.content}
                </p>
                {editMode && (
                  <button
                    onClick={() => {
                      setEditingId(story.id);
                      setEditingField("content");
                    }}
                    className="p-2 rounded-lg hover:bg-opacity-80 ml-4"
                    style={{ backgroundColor: "rgba(60, 70, 85, 0.5)", color: "#9ca3af" }}
                  >
                    <Edit2 size={18} />
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderEvents = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-4xl font-bold tracking-tight" style={{ color: accentColorLight, fontFamily: "'Playfair Display', serif" }}>
          Acontecimentos
        </h2>
        {editMode && (
          <button
            onClick={addEvent}
            className="px-5 py-3 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
            style={{ backgroundColor: accentColor, color: "#fff", fontFamily: "'Inter', sans-serif" }}
          >
            <Plus size={20} /> Adicionar Acontecimento
          </button>
        )}
      </div>
      <div className="space-y-4">
        {events.map((event) => (
          <div
            key={event.id}
            className="p-6 rounded-xl border-2"
            style={{ backgroundColor: "rgba(30, 35, 45, 0.6)", borderColor: `${accentColor}40` }}
          >
            <div className="flex justify-between items-start mb-4">
              {editMode && editingId === event.id && editingField === "title" ? (
                <div className="flex-1 flex gap-2">
                  <input
                    type="text"
                    value={event.title}
                    onChange={(e) => updateEvent(event.id, "title", e.target.value)}
                    className="flex-1 px-4 py-2 rounded-lg border-2 bg-transparent"
                    style={{ borderColor: accentColor, color: "#e5e7eb" }}
                  />
                  <button
                    onClick={() => {
                      setEditingId(null);
                      setEditingField(null);
                    }}
                    className="px-4 py-2 rounded-lg"
                    style={{ backgroundColor: accentColor, color: "#fff" }}
                  >
                    <Check size={18} />
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="text-2xl font-bold" style={{ color: accentColorLight, fontFamily: "'Inter', sans-serif" }}>
                    {event.title}
                  </h3>
                  {editMode && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditingId(event.id);
                          setEditingField("title");
                        }}
                        className="p-2 rounded-lg hover:bg-opacity-80"
                        style={{ backgroundColor: "rgba(60, 70, 85, 0.5)", color: "#9ca3af" }}
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => deleteItem(event.id, "event")}
                        className="p-2 rounded-lg hover:bg-opacity-80"
                        style={{ backgroundColor: "rgba(220, 38, 38, 0.8)", color: "#fff" }}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
            {editMode && editingId === event.id && editingField === "description" ? (
              <div className="space-y-2">
                <textarea
                  value={event.description}
                  onChange={(e) => updateEvent(event.id, "description", e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border-2 bg-transparent min-h-[150px]"
                  style={{ borderColor: accentColor, color: "#e5e7eb" }}
                />
                <button
                  onClick={() => {
                    setEditingId(null);
                    setEditingField(null);
                  }}
                  className="px-4 py-2 rounded-lg"
                  style={{ backgroundColor: accentColor, color: "#fff" }}
                >
                  <Check size={18} />
                </button>
              </div>
            ) : (
              <div className="flex justify-between items-start">
                <p className="text-base leading-relaxed" style={{ color: "#d1d5db" }}>
                  {event.description}
                </p>
                {editMode && (
                  <button
                    onClick={() => {
                      setEditingId(event.id);
                      setEditingField("description");
                    }}
                    className="p-2 rounded-lg hover:bg-opacity-80 ml-4"
                    style={{ backgroundColor: "rgba(60, 70, 85, 0.5)", color: "#9ca3af" }}
                  >
                    <Edit2 size={18} />
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderRules = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-4xl font-bold tracking-tight" style={{ color: accentColorLight, fontFamily: "'Playfair Display', serif" }}>
          Regras Gerais
        </h2>
        {editMode && (
          <button
            onClick={addRule}
            className="px-5 py-3 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
            style={{ backgroundColor: accentColor, color: "#fff", fontFamily: "'Inter', sans-serif" }}
          >
            <Plus size={20} /> Adicionar Regra
          </button>
        )}
      </div>
      <div className="space-y-4">
        {rules.map((rule) => (
          <div
            key={rule.id}
            className="p-6 rounded-xl border-2"
            style={{ backgroundColor: "rgba(30, 35, 45, 0.6)", borderColor: `${accentColor}40` }}
          >
            <div className="flex justify-between items-start mb-4">
              {editMode && editingId === rule.id && editingField === "title" ? (
                <div className="flex-1 flex gap-2">
                  <input
                    type="text"
                    value={rule.title}
                    onChange={(e) => updateRule(rule.id, "title", e.target.value)}
                    className="flex-1 px-4 py-2 rounded-lg border-2 bg-transparent"
                    style={{ borderColor: accentColor, color: "#e5e7eb" }}
                  />
                  <button
                    onClick={() => {
                      setEditingId(null);
                      setEditingField(null);
                    }}
                    className="px-4 py-2 rounded-lg"
                    style={{ backgroundColor: accentColor, color: "#fff" }}
                  >
                    <Check size={18} />
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="text-2xl font-bold" style={{ color: accentColorLight, fontFamily: "'Inter', sans-serif" }}>
                    {rule.title}
                  </h3>
                  {editMode && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditingId(rule.id);
                          setEditingField("title");
                        }}
                        className="p-2 rounded-lg hover:bg-opacity-80"
                        style={{ backgroundColor: "rgba(60, 70, 85, 0.5)", color: "#9ca3af" }}
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => deleteItem(rule.id, "rule")}
                        className="p-2 rounded-lg hover:bg-opacity-80"
                        style={{ backgroundColor: "rgba(220, 38, 38, 0.8)", color: "#fff" }}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
            {editMode && editingId === rule.id && editingField === "description" ? (
              <div className="space-y-2">
                <textarea
                  value={rule.description}
                  onChange={(e) => updateRule(rule.id, "description", e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border-2 bg-transparent min-h-[150px]"
                  style={{ borderColor: accentColor, color: "#e5e7eb" }}
                />
                <button
                  onClick={() => {
                    setEditingId(null);
                    setEditingField(null);
                  }}
                  className="px-4 py-2 rounded-lg"
                  style={{ backgroundColor: accentColor, color: "#fff" }}
                >
                  <Check size={18} />
                </button>
              </div>
            ) : (
              <div className="flex justify-between items-start">
                <p className="text-base leading-relaxed" style={{ color: "#d1d5db" }}>
                  {rule.description}
                </p>
                {editMode && (
                  <button
                    onClick={() => {
                      setEditingId(rule.id);
                      setEditingField("description");
                    }}
                    className="p-2 rounded-lg hover:bg-opacity-80 ml-4"
                    style={{ backgroundColor: "rgba(60, 70, 85, 0.5)", color: "#9ca3af" }}
                  >
                    <Edit2 size={18} />
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderArtifacts = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-4xl font-bold tracking-tight" style={{ color: accentColorLight, fontFamily: "'Playfair Display', serif" }}>
          Artefatos
        </h2>
        {editMode && (
          <button
            onClick={addArtifact}
            className="px-5 py-3 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
            style={{ backgroundColor: accentColor, color: "#fff", fontFamily: "'Inter', sans-serif" }}
          >
            <Plus size={20} /> Adicionar Artefato
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {artifacts.map((artifact) => (
          <div
            key={artifact.id}
            className="p-6 rounded-xl transition-all duration-300 border-2"
            style={{
              backgroundColor: "rgba(30, 35, 45, 0.6)",
              borderColor: `${accentColor}40`,
              backdropFilter: "blur(10px)",
            }}
          >
            <div className="space-y-4">
              <div className="relative">
                {artifact.image ? (
                  <img
                    src={artifact.image}
                    alt={artifact.title}
                    className="w-full rounded-lg object-cover"
                    style={{ height: imageSizeValue }}
                  />
                ) : (
                  <div
                    className="w-full rounded-lg flex items-center justify-center"
                    style={{
                      height: imageSizeValue,
                      backgroundColor: `${accentColor}20`,
                      border: `2px dashed ${accentColor}60`,
                    }}
                  >
                    <Upload size={40} style={{ color: `${accentColor}80` }} />
                  </div>
                )}
                {editMode && (
                  <label className="absolute bottom-2 right-2 cursor-pointer">
                    <div
                      className="p-2 rounded-lg transition-all shadow-lg"
                      style={{ backgroundColor: accentColor, color: "#fff" }}
                    >
                      <Upload size={16} />
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageUpload(e, (url) => updateArtifact(artifact.id, "image", url))}
                    />
                  </label>
                )}
              </div>

              <div>
                {editMode && editingId === artifact.id && editingField === "title" ? (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={artifact.title}
                      onChange={(e) => updateArtifact(artifact.id, "title", e.target.value)}
                      className="flex-1 px-3 py-2 rounded-lg border-2 bg-transparent"
                      style={{ borderColor: accentColor, color: "#e5e7eb" }}
                    />
                    <button
                      onClick={() => {
                        setEditingId(null);
                        setEditingField(null);
                      }}
                      className="px-3 py-2 rounded-lg"
                      style={{ backgroundColor: accentColor, color: "#fff" }}
                    >
                      <Check size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold" style={{ color: accentColorLight, fontFamily: "'Inter', sans-serif" }}>
                      {artifact.title}
                    </h3>
                    {editMode && (
                      <button
                        onClick={() => {
                          setEditingId(artifact.id);
                          setEditingField("title");
                        }}
                        className="p-2 rounded-lg hover:bg-opacity-80"
                        style={{ backgroundColor: "rgba(60, 70, 85, 0.5)", color: "#9ca3af" }}
                      >
                        <Edit2 size={16} />
                      </button>
                    )}
                  </div>
                )}
              </div>

              <div>
                {editMode && editingId === artifact.id && editingField === "description" ? (
                  <div className="space-y-2">
                    <textarea
                      value={artifact.description}
                      onChange={(e) => updateArtifact(artifact.id, "description", e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border-2 bg-transparent min-h-[100px]"
                      style={{ borderColor: accentColor, color: "#e5e7eb" }}
                    />
                    <button
                      onClick={() => {
                        setEditingId(null);
                        setEditingField(null);
                      }}
                      className="px-3 py-2 rounded-lg"
                      style={{ backgroundColor: accentColor, color: "#fff" }}
                    >
                      <Check size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-between items-start">
                    <p className="text-sm leading-relaxed" style={{ color: "#d1d5db" }}>
                      {artifact.description}
                    </p>
                    {editMode && (
                      <button
                        onClick={() => {
                          setEditingId(artifact.id);
                          setEditingField("description");
                        }}
                        className="p-2 rounded-lg hover:bg-opacity-80 ml-2"
                        style={{ backgroundColor: "rgba(60, 70, 85, 0.5)", color: "#9ca3af" }}
                      >
                        <Edit2 size={16} />
                      </button>
                    )}
                  </div>
                )}
              </div>

              {editMode && (
                <button
                  onClick={() => deleteItem(artifact.id, "artifact")}
                  className="w-full px-4 py-2 rounded-lg font-medium transition-all flex items-center justify-center gap-2"
                  style={{ backgroundColor: "rgba(220, 38, 38, 0.8)", color: "#fff" }}
                >
                  <Trash2 size={16} /> Deletar
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAdditional = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-4xl font-bold tracking-tight" style={{ color: accentColorLight, fontFamily: "'Playfair Display', serif" }}>
          Adicionais
        </h2>
        {editMode && (
          <button
            onClick={addAdditional}
            className="px-5 py-3 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
            style={{ backgroundColor: accentColor, color: "#fff", fontFamily: "'Inter', sans-serif" }}
          >
            <Plus size={20} /> Adicionar Adicional
          </button>
        )}
      </div>
      <div className="space-y-4">
        {additional.map((add) => (
          <div
            key={add.id}
            className="p-6 rounded-xl border-2"
            style={{ backgroundColor: "rgba(30, 35, 45, 0.6)", borderColor: `${accentColor}40` }}
          >
            <div className="flex justify-between items-start mb-4">
              {editMode && editingId === add.id && editingField === "title" ? (
                <div className="flex-1 flex gap-2">
                  <input
                    type="text"
                    value={add.title}
                    onChange={(e) => updateAdditional(add.id, "title", e.target.value)}
                    className="flex-1 px-4 py-2 rounded-lg border-2 bg-transparent"
                    style={{ borderColor: accentColor, color: "#e5e7eb" }}
                  />
                  <button
                    onClick={() => {
                      setEditingId(null);
                      setEditingField(null);
                    }}
                    className="px-4 py-2 rounded-lg"
                    style={{ backgroundColor: accentColor, color: "#fff" }}
                  >
                    <Check size={18} />
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="text-2xl font-bold" style={{ color: accentColorLight, fontFamily: "'Inter', sans-serif" }}>
                    {add.title}
                  </h3>
                  {editMode && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditingId(add.id);
                          setEditingField("title");
                        }}
                        className="p-2 rounded-lg hover:bg-opacity-80"
                        style={{ backgroundColor: "rgba(60, 70, 85, 0.5)", color: "#9ca3af" }}
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => deleteItem(add.id, "additional")}
                        className="p-2 rounded-lg hover:bg-opacity-80"
                        style={{ backgroundColor: "rgba(220, 38, 38, 0.8)", color: "#fff" }}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
            {editMode && editingId === add.id && editingField === "content" ? (
              <div className="space-y-2">
                <textarea
                  value={add.content}
                  onChange={(e) => updateAdditional(add.id, "content", e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border-2 bg-transparent min-h-[150px]"
                  style={{ borderColor: accentColor, color: "#e5e7eb" }}
                />
                <button
                  onClick={() => {
                    setEditingId(null);
                    setEditingField(null);
                  }}
                  className="px-4 py-2 rounded-lg"
                  style={{ backgroundColor: accentColor, color: "#fff" }}
                >
                  <Check size={18} />
                </button>
              </div>
            ) : (
              <div className="flex justify-between items-start">
                <p className="text-base leading-relaxed" style={{ color: "#d1d5db" }}>
                  {add.content}
                </p>
                {editMode && (
                  <button
                    onClick={() => {
                      setEditingId(add.id);
                      setEditingField("content");
                    }}
                    className="p-2 rounded-lg hover:bg-opacity-80 ml-4"
                    style={{ backgroundColor: "rgba(60, 70, 85, 0.5)", color: "#9ca3af" }}
                  >
                    <Edit2 size={18} />
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderCustomCategory = (category: CustomCategory) => (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-4xl font-bold tracking-tight" style={{ color: accentColorLight, fontFamily: "'Playfair Display', serif" }}>
          {category.name}
        </h2>
        <div className="flex gap-2">
          {editMode && (
            <>
              <button
                onClick={() => addCustomItem(category.id)}
                className="px-5 py-3 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
                style={{ backgroundColor: accentColor, color: "#fff", fontFamily: "'Inter', sans-serif" }}
              >
                <Plus size={20} /> Adicionar Item
              </button>
              <button
                onClick={() => deleteCustomCategory(category.id)}
                className="px-5 py-3 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
                style={{ backgroundColor: "rgba(220, 38, 38, 0.8)", color: "#fff", fontFamily: "'Inter', sans-serif" }}
              >
                <Trash2 size={20} /> Deletar Categoria
              </button>
            </>
          )}
        </div>
      </div>

      {category.type === "image-text" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {category.items.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-xl transition-all duration-300 border-2"
              style={{
                backgroundColor: "rgba(30, 35, 45, 0.6)",
                borderColor: `${accentColor}40`,
                backdropFilter: "blur(10px)",
              }}
            >
              <div className="space-y-4">
                <div className="relative">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full rounded-lg object-cover"
                      style={{ height: imageSizeValue }}
                    />
                  ) : (
                    <div
                      className="w-full rounded-lg flex items-center justify-center"
                      style={{
                        height: imageSizeValue,
                        backgroundColor: `${accentColor}20`,
                        border: `2px dashed ${accentColor}60`,
                      }}
                    >
                      <Upload size={40} style={{ color: `${accentColor}80` }} />
                    </div>
                  )}
                  {editMode && (
                    <label className="absolute bottom-2 right-2 cursor-pointer">
                      <div
                        className="p-2 rounded-lg transition-all shadow-lg"
                        style={{ backgroundColor: accentColor, color: "#fff" }}
                      >
                        <Upload size={16} />
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleImageUpload(e, (url) => updateCustomItem(category.id, item.id, "image", url))}
                      />
                    </label>
                  )}
                </div>

                <div>
                  {editMode && editingId === item.id && editingField === "title" ? (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => updateCustomItem(category.id, item.id, "title", e.target.value)}
                        className="flex-1 px-3 py-2 rounded-lg border-2 bg-transparent"
                        style={{ borderColor: accentColor, color: "#e5e7eb" }}
                      />
                      <button
                        onClick={() => {
                          setEditingId(null);
                          setEditingField(null);
                        }}
                        className="px-3 py-2 rounded-lg"
                        style={{ backgroundColor: accentColor, color: "#fff" }}
                      >
                        <Check size={16} />
                      </button>
                    </div>
                  ) : (
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-bold" style={{ color: accentColorLight, fontFamily: "'Inter', sans-serif" }}>
                        {item.title}
                      </h3>
                      {editMode && (
                        <button
                          onClick={() => {
                            setEditingId(item.id);
                            setEditingField("title");
                          }}
                          className="p-2 rounded-lg hover:bg-opacity-80"
                          style={{ backgroundColor: "rgba(60, 70, 85, 0.5)", color: "#9ca3af" }}
                        >
                          <Edit2 size={16} />
                        </button>
                      )}
                    </div>
                  )}
                </div>

                <div>
                  {editMode && editingId === item.id && editingField === "description" ? (
                    <div className="space-y-2">
                      <textarea
                        value={item.description}
                        onChange={(e) => updateCustomItem(category.id, item.id, "description", e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border-2 bg-transparent min-h-[100px]"
                        style={{ borderColor: accentColor, color: "#e5e7eb" }}
                      />
                      <button
                        onClick={() => {
                          setEditingId(null);
                          setEditingField(null);
                        }}
                        className="px-3 py-2 rounded-lg"
                        style={{ backgroundColor: accentColor, color: "#fff" }}
                      >
                        <Check size={16} />
                      </button>
                    </div>
                  ) : (
                    <div className="flex justify-between items-start">
                      <p className="text-sm leading-relaxed" style={{ color: "#d1d5db" }}>
                        {item.description}
                      </p>
                      {editMode && (
                        <button
                          onClick={() => {
                            setEditingId(item.id);
                            setEditingField("description");
                          }}
                          className="p-2 rounded-lg hover:bg-opacity-80 ml-2"
                          style={{ backgroundColor: "rgba(60, 70, 85, 0.5)", color: "#9ca3af" }}
                        >
                          <Edit2 size={16} />
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {editMode && (
                  <button
                    onClick={() => deleteCustomItem(category.id, item.id)}
                    className="w-full px-4 py-2 rounded-lg font-medium transition-all flex items-center justify-center gap-2"
                    style={{ backgroundColor: "rgba(220, 38, 38, 0.8)", color: "#fff" }}
                  >
                    <Trash2 size={16} /> Deletar
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {category.items.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-xl border-2"
              style={{ backgroundColor: "rgba(30, 35, 45, 0.6)", borderColor: `${accentColor}40` }}
            >
              <div className="flex justify-between items-start mb-4">
                {editMode && editingId === item.id && editingField === "title" ? (
                  <div className="flex-1 flex gap-2">
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => updateCustomItem(category.id, item.id, "title", e.target.value)}
                      className="flex-1 px-4 py-2 rounded-lg border-2 bg-transparent"
                      style={{ borderColor: accentColor, color: "#e5e7eb" }}
                    />
                    <button
                      onClick={() => {
                        setEditingId(null);
                        setEditingField(null);
                      }}
                      className="px-4 py-2 rounded-lg"
                      style={{ backgroundColor: accentColor, color: "#fff" }}
                    >
                      <Check size={18} />
                    </button>
                  </div>
                ) : (
                  <>
                    <h3 className="text-2xl font-bold" style={{ color: accentColorLight, fontFamily: "'Inter', sans-serif" }}>
                      {item.title}
                    </h3>
                    {editMode && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setEditingId(item.id);
                            setEditingField("title");
                          }}
                          className="p-2 rounded-lg hover:bg-opacity-80"
                          style={{ backgroundColor: "rgba(60, 70, 85, 0.5)", color: "#9ca3af" }}
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => deleteCustomItem(category.id, item.id)}
                          className="p-2 rounded-lg hover:bg-opacity-80"
                          style={{ backgroundColor: "rgba(220, 38, 38, 0.8)", color: "#fff" }}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
              {editMode && editingId === item.id && editingField === "description" ? (
                <div className="space-y-2">
                  <textarea
                    value={item.description}
                    onChange={(e) => updateCustomItem(category.id, item.id, "description", e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border-2 bg-transparent min-h-[150px]"
                    style={{ borderColor: accentColor, color: "#e5e7eb" }}
                  />
                  <button
                    onClick={() => {
                      setEditingId(null);
                      setEditingField(null);
                    }}
                    className="px-4 py-2 rounded-lg"
                    style={{ backgroundColor: accentColor, color: "#fff" }}
                  >
                    <Check size={18} />
                  </button>
                </div>
              ) : (
                <div className="flex justify-between items-start">
                  <p className="text-base leading-relaxed" style={{ color: "#d1d5db" }}>
                    {item.description}
                  </p>
                  {editMode && (
                    <button
                      onClick={() => {
                        setEditingId(item.id);
                        setEditingField("description");
                      }}
                      className="p-2 rounded-lg hover:bg-opacity-80 ml-4"
                      style={{ backgroundColor: "rgba(60, 70, 85, 0.5)", color: "#9ca3af" }}
                    >
                      <Edit2 size={18} />
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div
      className="min-h-screen"
      style={{
        background: "linear-gradient(135deg, #1a1f28 0%, #252b38 50%, #1a1f28 100%)",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Sidebar */}
      <div
        className="fixed left-0 top-0 h-full w-80 p-6 overflow-y-auto"
        style={{
          backgroundColor: "rgba(20, 25, 35, 0.95)",
          backdropFilter: "blur(20px)",
          borderRight: `1px solid ${accentColor}30`,
        }}
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4" style={{ color: accentColorLight, fontFamily: "'Playfair Display', serif" }}>
            TrashBinners
          </h1>
          <div className="flex gap-2 mb-4">
            <label htmlFor="import-data-sidebar">
              <div
                className="px-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer hover:scale-105 flex items-center gap-1.5"
                style={{ backgroundColor: `${accentColor}`, color: "#fff" }}
              >
                <UploadCloud size={14} />
                Importar
              </div>
              <input
                id="import-data-sidebar"
                type="file"
                accept=".json"
                className="hidden"
                onChange={importData}
              />
            </label>
            <button
              onClick={exportData}
              className="px-3 py-2 rounded-lg text-xs font-medium transition-all hover:scale-105 flex items-center gap-1.5"
              style={{ backgroundColor: `${accentColor}`, color: "#fff" }}
            >
              <Download size={14} />
              Exportar
            </button>
          </div>
          <div className="pt-4 space-y-3 border-t mb-6" style={{ borderColor: `${accentColor}30` }}>
            <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider">
              Tamanho das Imagens
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => setImageSize("pequeno")}
                className="flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-all"
                style={{ 
                  backgroundColor: imageSize === "pequeno" ? accentColor : "rgba(60, 70, 85, 0.5)",
                  color: imageSize === "pequeno" ? "#fff" : "#9ca3af",
                  border: `1px solid ${imageSize === "pequeno" ? accentColor : "transparent"}`
                }}
              >
                Pequeno
              </button>
              <button
                onClick={() => setImageSize("medio")}
                className="flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-all"
                style={{ 
                  backgroundColor: imageSize === "medio" ? accentColor : "rgba(60, 70, 85, 0.5)",
                  color: imageSize === "medio" ? "#fff" : "#9ca3af",
                  border: `1px solid ${imageSize === "medio" ? accentColor : "transparent"}`
                }}
              >
                Médio
              </button>
              <button
                onClick={() => setImageSize("grande")}
                className="flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-all"
                style={{ 
                  backgroundColor: imageSize === "grande" ? accentColor : "rgba(60, 70, 85, 0.5)",
                  color: imageSize === "grande" ? "#fff" : "#9ca3af",
                  border: `1px solid ${imageSize === "grande" ? accentColor : "transparent"}`
                }}
              >
                Grande
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-2">
        <button
          onClick={() => {
            setActiveSection("characters");
            setSelectedCharacter(null);
          }}
          className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 font-light tracking-wide ${
            activeSection === "characters" ? "font-medium" : ""
          }`}
          style={{
            backgroundColor: activeSection === "characters" ? `${accentColor}40` : "transparent",
            color: activeSection === "characters" ? accentColorLight : "#9ca3af",
            borderLeft: activeSection === "characters" ? `3px solid ${accentColor}` : "3px solid transparent",
          }}
        >
          Personagens
        </button>

        <button
          onClick={() => setActiveSection("stories")}
          className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 font-light tracking-wide ${
            activeSection === "stories" ? "font-medium" : ""
          }`}
          style={{
            backgroundColor: activeSection === "stories" ? `${accentColor}40` : "transparent",
            color: activeSection === "stories" ? accentColorLight : "#9ca3af",
            borderLeft: activeSection === "stories" ? `3px solid ${accentColor}` : "3px solid transparent",
          }}
        >
          História Principal
        </button>

        <button
          onClick={() => setActiveSection("events")}
          className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 font-light tracking-wide ${
            activeSection === "events" ? "font-medium" : ""
          }`}
          style={{
            backgroundColor: activeSection === "events" ? `${accentColor}40` : "transparent",
            color: activeSection === "events" ? accentColorLight : "#9ca3af",
            borderLeft: activeSection === "events" ? `3px solid ${accentColor}` : "3px solid transparent",
          }}
        >
          Acontecimentos
        </button>

        <button
          onClick={() => setActiveSection("rules")}
          className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 font-light tracking-wide ${
            activeSection === "rules" ? "font-medium" : ""
          }`}
          style={{
            backgroundColor: activeSection === "rules" ? `${accentColor}40` : "transparent",
            color: activeSection === "rules" ? accentColorLight : "#9ca3af",
            borderLeft: activeSection === "rules" ? `3px solid ${accentColor}` : "3px solid transparent",
          }}
        >
          Regras Gerais
        </button>

        <button
          onClick={() => setActiveSection("artifacts")}
          className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 font-light tracking-wide ${
            activeSection === "artifacts" ? "font-medium" : ""
          }`}
          style={{
            backgroundColor: activeSection === "artifacts" ? `${accentColor}40` : "transparent",
            color: activeSection === "artifacts" ? accentColorLight : "#9ca3af",
            borderLeft: activeSection === "artifacts" ? `3px solid ${accentColor}` : "3px solid transparent",
          }}
        >
          Artefatos
        </button>

        <button
          onClick={() => setActiveSection("additional")}
          className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 font-light tracking-wide ${
            activeSection === "additional" ? "font-medium" : ""
          }`}
          style={{
            backgroundColor: activeSection === "additional" ? `${accentColor}40` : "transparent",
            color: activeSection === "additional" ? accentColorLight : "#9ca3af",
            borderLeft: activeSection === "additional" ? `3px solid ${accentColor}` : "3px solid transparent",
          }}
        >
          Adicionais
        </button>

        {customCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveSection(cat.id)}
            className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 font-light tracking-wide ${
              activeSection === cat.id ? "font-medium" : ""
            }`}
            style={{
              backgroundColor: activeSection === cat.id ? `${accentColor}40` : "transparent",
              color: activeSection === cat.id ? accentColorLight : "#9ca3af",
              borderLeft: activeSection === cat.id ? `3px solid ${accentColor}` : "3px solid transparent",
            }}
          >
            {cat.name}
          </button>
        ))}

        {editMode && (
          <button
            onClick={() => setShowCategoryModal(true)}
            className="w-full text-left px-4 py-3 rounded-lg transition-all duration-200 border font-light tracking-wide"
            style={{ borderColor: `${accentColor}60`, color: "#9ca3af" }}
          >
            <Plus className="inline w-4 h-4 mr-2" /> Nova Categoria
          </button>
        )}

        <div className="pt-8 space-y-4 border-t mt-6" style={{ borderColor: `${accentColor}30` }}>
          <div className="space-y-2">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Tema</span>
              <div
                onClick={() => setShowThemePicker(!showThemePicker)}
                className="relative w-12 h-6 rounded-full transition-all duration-300"
                style={{ backgroundColor: showThemePicker ? accentColor : "rgba(60, 70, 85, 0.5)" }}
              >
                <div
                  className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-300"
                  style={{ transform: showThemePicker ? "translateX(24px)" : "translateX(0)" }}
                />
              </div>
            </label>
            {showThemePicker && (
              <div className="space-y-2 p-3 rounded-lg" style={{ backgroundColor: "rgba(30, 35, 45, 0.8)" }}>
                <label className="block text-xs text-gray-400">Matiz</label>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={hue}
                  onChange={(e) => setHue(Number(e.target.value))}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, 
                      hsl(0, 70%, 60%), 
                      hsl(60, 70%, 60%), 
                      hsl(120, 70%, 60%), 
                      hsl(180, 70%, 60%), 
                      hsl(240, 70%, 60%), 
                      hsl(300, 70%, 60%), 
                      hsl(360, 70%, 60%))`
                  }}
                />
              </div>
            )}
          </div>
          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Modo Edição</span>
            <div
              onClick={() => setEditMode(!editMode)}
              className="relative w-12 h-6 rounded-full transition-all duration-300"
              style={{ backgroundColor: editMode ? accentColor : "rgba(60, 70, 85, 0.5)" }}
            >
              <div
                className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-300"
                style={{ transform: editMode ? "translateX(24px)" : "translateX(0)" }}
              />
            </div>
          </label>
        </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-80 p-10">
        {activeSection === "characters" && !selectedCharacter && renderCharacterList()}
        {activeSection === "characters" && selectedCharacter && renderCharacterBio()}
        {activeSection === "stories" && renderStories()}
        {activeSection === "events" && renderEvents()}
        {activeSection === "rules" && renderRules()}
        {activeSection === "artifacts" && renderArtifacts()}
        {activeSection === "additional" && renderAdditional()}
        {customCategories.find((c) => c.id === activeSection) &&
          renderCustomCategory(customCategories.find((c) => c.id === activeSection)!)}
      </div>

      {/* Category Modal */}
      {showCategoryModal && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
          onClick={() => setShowCategoryModal(false)}
        >
          <div
            className="p-8 rounded-xl max-w-md w-full mx-4 border-2"
            style={{ backgroundColor: "rgba(30, 35, 45, 0.95)", borderColor: `${accentColor}60` }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold mb-6" style={{ color: accentColorLight, fontFamily: "'Playfair Display', serif" }}>
              Nova Categoria
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: "#9ca3af" }}>
                  Nome da Categoria
                </label>
                <input
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border-2 bg-transparent"
                  style={{ borderColor: accentColor, color: "#e5e7eb" }}
                  placeholder="Ex: Locais, Facções, etc."
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: "#9ca3af" }}>
                  Tipo
                </label>
                <div className="flex gap-3">
                  <button
                    onClick={() => setNewCategoryType("image-text")}
                    className="flex-1 px-4 py-3 rounded-lg font-medium transition-all"
                    style={{
                      backgroundColor: newCategoryType === "image-text" ? accentColor : "rgba(60, 70, 85, 0.5)",
                      color: newCategoryType === "image-text" ? "#fff" : "#9ca3af",
                      border: `2px solid ${newCategoryType === "image-text" ? accentColor : "transparent"}`,
                    }}
                  >
                    Imagem + Texto
                  </button>
                  <button
                    onClick={() => setNewCategoryType("text-only")}
                    className="flex-1 px-4 py-3 rounded-lg font-medium transition-all"
                    style={{
                      backgroundColor: newCategoryType === "text-only" ? accentColor : "rgba(60, 70, 85, 0.5)",
                      color: newCategoryType === "text-only" ? "#fff" : "#9ca3af",
                      border: `2px solid ${newCategoryType === "text-only" ? accentColor : "transparent"}`,
                    }}
                  >
                    Só Texto
                  </button>
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowCategoryModal(false)}
                  className="flex-1 px-5 py-3 rounded-lg font-semibold transition-all"
                  style={{ backgroundColor: "rgba(60, 70, 85, 0.5)", color: "#9ca3af" }}
                >
                  Cancelar
                </button>
                <button
                  onClick={createCustomCategory}
                  className="flex-1 px-5 py-3 rounded-lg font-semibold transition-all"
                  style={{ backgroundColor: accentColor, color: "#fff" }}
                >
                  Criar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
