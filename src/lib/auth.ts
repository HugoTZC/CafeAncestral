import { supabase } from './supabase';

export async function signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        throw error;
    }

    return data;
}

export async function signOut() {
    const { error } = await supabase.auth.signOut();

    if (error) {
        throw error;
    }
}

export async function getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error) {
        throw error;
    }

    return user;
}

export async function isAdmin(userId: string): Promise<boolean> {
    const { data, error } = await supabase
        .from('admin_users')
        .select('id')
        .eq('user_id', userId)
        .maybeSingle(); // Use maybeSingle() instead of single() to avoid errors when no row exists

    if (error) {
        console.error('Error checking admin status:', error);
        return false;
    }

    return !!data;
}

export async function checkAdminStatus() {
    const user = await getCurrentUser();

    if (!user) {
        return false;
    }

    return await isAdmin(user.id);
}
