/* -*- Mode: c++; c-basic-offset: 2; indent-tabs-mode: nil; tab-width: 40 -*- */
/* vim: set ts=2 et sw=2 tw=80: */
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

#ifndef mozilla_dom_bluetooth_ipc_bluetoothmessageutils_h__
#define mozilla_dom_bluetooth_ipc_bluetoothmessageutils_h__

#include "mozilla/dom/bluetooth/BluetoothCommon.h"
#include "ipc/IPCMessageUtils.h"

namespace IPC {

template <>
struct ParamTraits<mozilla::dom::bluetooth::BluetoothObjectType>
  : public EnumSerializer<mozilla::dom::bluetooth::BluetoothObjectType,
                          mozilla::dom::bluetooth::TYPE_MANAGER,
                          mozilla::dom::bluetooth::TYPE_INVALID>
{ };

} // namespace IPC

#endif // mozilla_dom_bluetooth_ipc_bluetoothchild_h__
