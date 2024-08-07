import toast from "react-hot-toast";

export const fetchPokemonNames = async (setPokemonNames) => {
  try {
    const response = await fetch("http://localhost:3000/api/pokemon/names");
    const data = await response.json();
    setPokemonNames(data);
  } catch (error) {
    toast.error("Error fetching Pokémon names:", error);
  }
};

export const fetchPokemonAbilities = async (
  name,
  setPokemonAbilities,
  setPokemonAbility
) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/pokemon/abilities/${name}`
    );
    const data = await response.json();
    setPokemonAbilities(data);
    if (data.length === 1) {
      setPokemonAbility(data[0]);
    } else {
      setPokemonAbility("");
    }
  } catch (error) {
    toast.error("Error fetching Pokémon abilities:", error);
  }
};

export const fetchUsers = async (setUsers) => {
  try {
    const response = await fetch("http://localhost:3000/api/users");
    const data = await response.json();
    setUsers(data);
  } catch (error) {
    toast.error("Error fetching users:", error);
  }
};

export const handleSubmit = async (
  e,
  url,
  method,
  body,
  navigate,
  isUpdating
) => {
  e.preventDefault();
  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (response.ok) {
      toast.success(`Pokemon ${isUpdating ? "updated" : "added"} successfully`);
    } else {
      toast.error(
        `Error ${isUpdating ? "updating" : "adding"} Pokémon:`,
        response.statusText
      );
    }
  } catch (error) {
    toast.error(`Error ${isUpdating ? "updating" : "adding"} Pokémon:`, error);
  }
};
