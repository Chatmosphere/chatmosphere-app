import { FC } from 'react'
import create from 'zustand'
import { IAddonStore } from './types'

export const useAddonStore = create<IAddonStore>((set) => ({
	settings: [],
	menu: [],
	pages: [],
	addSetting: (el:FC) => set(state => ({settings: [...state.settings, el]})),
	addMenu: (el) => set(state => ({menu: [...state.menu, el]})),
	addPage: (el) => set(state => ({pages: [...state.pages, el]})),
	removeAddon: (addon) => set(state => removeAddon(state, addon)),
}))

const removeAddon = (state, addon) => {
	const { settings, menu, pages } = state
	const newSettings = settings.filter(el => el !== addon)
	const newMenu = menu.filter(el => el !== addon)
	const newPages = pages.filter(el => el !== addon)
	return { ...state, settings: newSettings, menu: newMenu, pages: newPages }
}