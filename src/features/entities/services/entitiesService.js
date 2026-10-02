import apiClient from "@/common/services/apiClient";
import { ENDPOINTS } from "@/common/constants/endpoints";
import { mapEntity, mapEntityList } from "../mappers/entityMapper";

export async function getEntities(page = 1) {
  const response = await apiClient.get(ENDPOINTS.ENTITIES.LIST(page));
  return mapEntityList(response.data?.data);
}

export async function getAllEntities() {
  const response = await apiClient.get(ENDPOINTS.ENTITIES.ALL);
  return mapEntityList(response.data?.data);
}

export async function createEntity(payload) {
  const response = await apiClient.post(ENDPOINTS.ENTITIES.CREATE, payload);
  return mapEntity(response.data?.data ?? {});
}

export async function updateEntity(id, payload) {
  const response = await apiClient.put(ENDPOINTS.ENTITIES.BY_ID(id), payload);
  return mapEntity(response.data?.data ?? {});
}

export async function deleteEntityRequest(id) {
  const response = await apiClient.delete(ENDPOINTS.ENTITIES.BY_ID(id));
  return response.data;
}
