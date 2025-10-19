// Hansel Hernandez - _gishikoDev

import axios from 'axios';

export async function fetchAddressByCep(cep) {
  try {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    if (response.data.erro) return null;
    return response.data;
  } catch (error) {
    return null;
  }
}
