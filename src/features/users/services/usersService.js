import apiClient from "@/common/services/apiClient";
import { ENDPOINTS } from "@/common/constants/endpoints";
import { mapUserList } from "../mappers/userMapper";

export async function getUsers(page = 1) {
  const response = await apiClient.get(ENDPOINTS.USERS.LIST(page));
  const body = response.data ?? {};

  return {
    users: mapUserList(body.data),
    pagination: {
      current_page: body.current_page,
      last_page: body.last_page,
      next_page_url: body.next_page_url,
      prev_page_url: body.prev_page_url,
    },
  };
}

export async function createEmployee(payload) {
  const response = await apiClient.post(ENDPOINTS.USERS.CREATE_EMPLOYEE, payload);
  return response.data;
}

export async function updateUser(userId, data) {
  const response = await apiClient.put(ENDPOINTS.USERS.BY_ID(userId), data);
  return response.data;
}

export async function activateUser(userId, changeReason) {
  const response = await apiClient.post(ENDPOINTS.USERS.ACTIVATE(userId), {
    change_reason: changeReason,
  });
  return response.data;
}

export async function deactivateUser(userId, changeReason) {
  const response = await apiClient.post(ENDPOINTS.USERS.DEACTIVATE(userId), {
    change_reason: changeReason,
  });
  return response.data;
}

export async function changeUserRole(userId, payload) {
  const response = await apiClient.post(ENDPOINTS.USERS.ROLE(userId), payload);
  return response.data;
}

export async function transferEmployee(userId, payload) {
  const response = await apiClient.post(ENDPOINTS.USERS.TRANSFER(userId), payload);
  return response.data;
}
