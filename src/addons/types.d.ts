import { FC } from "react";

interface IAddonStore {
	settings: FC[]
	menu: object[]
	pages: object[]
	addSetting: (el: FC) => void
	addMenu: (el: object) => void
	addPage: (el: object) => void
}