export type UserRole = 'Admin' | 'EcoAliado' | 'EcoAmigo' | 'EcoAgente';

export interface User {
  id: string;
  name: string;
  email: string;
  points: number;
  avatar: string;
  level: string;
  role: UserRole;
  location?: string;
}

export interface EcoAction {
  id: string;
  title: string;
  description: string;
  points: number;
  category: 'recycling' | 'energy' | 'water' | 'community';
  date: string;
  status: 'pending' | 'verified' | 'rejected';
}

export interface MarketplaceItem {
  id: string;
  name: string;
  description: string;
  pricePoints: number;
  image: string;
  category: string;
}

export interface CommunityEvent {
  id: string;
  title: string;
  date: string;
  location: string;
  attendees: number;
  image: string;
  category?: string;
}

export interface SupportTicket {
  id: string;
  subject: string;
  status: 'open' | 'closed';
  date: string;
}
