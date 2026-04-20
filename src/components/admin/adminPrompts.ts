export type AdminLang = 'es' | 'ru' | 'en';

type Key =
  | 'delete_user' | 'delete_user_with_data'
  | 'delete_role' | 'delete_role_in_use'
  | 'delete_api_key' | 'revoke_api_key'
  | 'revoke_certificate' | 'approve_registration'
  | 'reject_registration' | 'confirm_seed'
  | 'generic_error' | 'save_error' | 'delete_error'
  | 'network_error' | 'copied_to_clipboard';

const T: Record<AdminLang, Record<Key, string>> = {
  es: {
    delete_user: '¿Eliminar este usuario?',
    delete_user_with_data: '¿Eliminar este usuario y TODOS sus datos (progreso, certificados, badges)?',
    delete_role: '¿Eliminar este rol?',
    delete_role_in_use: 'Este rol esta en uso. ¿Eliminarlo de todas formas?',
    delete_api_key: '¿Eliminar esta API key?',
    revoke_api_key: '¿Revocar esta API key? Los consumidores perderan acceso inmediatamente.',
    revoke_certificate: '¿Revocar este certificado?',
    approve_registration: '¿Aprobar este registro?',
    reject_registration: '¿Rechazar este registro?',
    confirm_seed: '¿Ejecutar seed de datos por defecto?',
    generic_error: 'Ocurrio un error. Intenta de nuevo.',
    save_error: 'Error al guardar. Intenta de nuevo.',
    delete_error: 'Error al eliminar. Intenta de nuevo.',
    network_error: 'Error de red. Verifica tu conexion.',
    copied_to_clipboard: 'Copiado al portapapeles',
  },
  ru: {
    delete_user: 'Удалить этого пользователя?',
    delete_user_with_data: 'Удалить этого пользователя и ВСЕ его данные (прогресс, сертификаты, значки)?',
    delete_role: 'Удалить эту роль?',
    delete_role_in_use: 'Эта роль используется. Всё равно удалить?',
    delete_api_key: 'Удалить этот API-ключ?',
    revoke_api_key: 'Отозвать этот API-ключ? Потребители немедленно потеряют доступ.',
    revoke_certificate: 'Отозвать этот сертификат?',
    approve_registration: 'Одобрить эту регистрацию?',
    reject_registration: 'Отклонить эту регистрацию?',
    confirm_seed: 'Запустить начальные данные?',
    generic_error: 'Произошла ошибка. Попробуйте снова.',
    save_error: 'Ошибка сохранения. Попробуйте снова.',
    delete_error: 'Ошибка удаления. Попробуйте снова.',
    network_error: 'Сетевая ошибка. Проверьте подключение.',
    copied_to_clipboard: 'Скопировано в буфер обмена',
  },
  en: {
    delete_user: 'Delete this user?',
    delete_user_with_data: 'Delete this user and ALL their data (progress, certificates, badges)?',
    delete_role: 'Delete this role?',
    delete_role_in_use: 'This role is in use. Delete anyway?',
    delete_api_key: 'Delete this API key?',
    revoke_api_key: 'Revoke this API key? Consumers will lose access immediately.',
    revoke_certificate: 'Revoke this certificate?',
    approve_registration: 'Approve this registration?',
    reject_registration: 'Reject this registration?',
    confirm_seed: 'Run default data seed?',
    generic_error: 'An error occurred. Please try again.',
    save_error: 'Failed to save. Please try again.',
    delete_error: 'Failed to delete. Please try again.',
    network_error: 'Network error. Check your connection.',
    copied_to_clipboard: 'Copied to clipboard',
  },
};

export function adminConfirm(key: Key, lang: AdminLang = 'es'): boolean {
  const msg = T[lang]?.[key] || T.es[key];
  return typeof window === 'undefined' ? false : window.confirm(msg);
}

export function adminAlert(key: Key, lang: AdminLang = 'es'): void {
  const msg = T[lang]?.[key] || T.es[key];
  if (typeof window !== 'undefined') window.alert(msg);
}
