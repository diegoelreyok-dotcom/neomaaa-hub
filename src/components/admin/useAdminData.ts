'use client';

import useSWR from 'swr';
import type {
  AdminUser,
  AdminRole,
  AdminProgress,
  AdminRegistration,
} from './fetcher';
import { jsonFetcher } from './fetcher';

// Long dedupe interval so navigating between admin tabs never refetches.
// Mutations explicitly call mutate() to update cache.
const OPTS = {
  revalidateOnFocus: false,
  dedupingInterval: 60_000,
  keepPreviousData: true,
};

export function useAdminUsers() {
  const { data, error, isLoading, mutate } = useSWR<AdminUser[]>(
    '/api/users',
    jsonFetcher,
    OPTS,
  );
  return {
    users: data ?? [],
    isLoading,
    error,
    mutate,
  };
}

export function useAdminRoles() {
  const { data, error, isLoading, mutate } = useSWR<AdminRole[]>(
    '/api/roles',
    jsonFetcher,
    OPTS,
  );
  return {
    roles: data ?? [],
    isLoading,
    error,
    mutate,
  };
}

export function useAdminProgress() {
  const { data, error, isLoading, mutate } = useSWR<AdminProgress[]>(
    '/api/progress',
    jsonFetcher,
    OPTS,
  );
  return {
    progress: data ?? [],
    isLoading,
    error,
    mutate,
  };
}

export function useAdminRegistrations() {
  const { data, error, isLoading, mutate } = useSWR<AdminRegistration[]>(
    '/api/register',
    jsonFetcher,
    OPTS,
  );
  return {
    registrations: data ?? [],
    isLoading,
    error,
    mutate,
  };
}
