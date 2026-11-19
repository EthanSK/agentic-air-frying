# Connected setup

Use the [illustrated public setup guide](https://ethansk.github.io/agentic-air-frying/setup.html) for compatible hardware, VeSync pairing, iPhone Mirroring, retailer apps and the optional foil-tipped Fingerbot experiment. For this setup, [enable Codex Computer Use](https://ethansk.github.io/agentic-air-frying/setup.html#computer-use) to give the agent access to the Mac apps. If another host provides authorised Mac app controls, use its supported route. A skill installation does not itself add device access.

## Find recent orders

1. When the task authorises reading the cook’s order history, use the already configured iPhone Mirroring session and open the cook’s signed-in [Zapp](https://apps.apple.com/gb/app/zapp-24-7-drinks-groceries/id1545579060) or [Zoom by Ocado](https://apps.apple.com/gb/app/zoom-by-ocado-food-delivery/id1447126432) app. If the connection or sign-in is missing, use a supplied receipt or invite the cook to complete the normal sign-in flow themselves. [Apple’s setup guide](https://support.apple.com/en-gb/120421) lists device, account and regional requirements.
2. Read the relevant recent delivered orders for product name, variant, pack size and quantity. Skip payment details, order numbers, addresses and unrelated account screens. Keep lookup read-only. Shopping or changing the account is a separate request.
3. Combine the purchases with any currently supplied meal, leftover or stock notes. Treat the result as an estimate of what remains. A delivered order cannot establish current quantity, freshness, fridge/freezer state or which package is open. Ask only about gaps that affect the plan.
4. Match the product to its packet or manufacturer directions when possible. If an order is inaccessible, say which evidence you used instead and proceed as far as it supports.

## Prepare and verify a COSORI Pro Smart cook

1. Confirm the active appliance and its zones. For the Turbo Tower Pro Smart, the top and bottom drawers can use separate programs. Sync coordinates finish times and Match copies settings. Use the [guide for the exact model](https://ethansk.github.io/agentic-air-frying/setup.html#fryer) to confirm capacity, mode and controls.
2. Prepare settings only for a cook the user authorised and confirmed loaded. Use the paired VeSync app through a supported interface. Check the mode, temperature, time and Sync/Match for each intended drawer before sending. Confirm an unused zone is actually deselected on the fryer when doing a single-drawer cook. If the app cannot verify that, have the cook check the panel.
3. Submit the confirmed program once, then read back the result. If the submission outcome is unclear, inspect the current state before trying again. Stop network actions on a rate limit. Keep the staged program if the physical Start step is still pending.
4. The cook presses Start/Pause by hand at the appliance. Read back **Cooking** and the actual countdown for the expected zones when available. A shorter synced program can remain on Hold. Report prepared, started and finished states separately. The timer does not confirm doneness.
5. The [foil and Blu Tack prototype](https://ethansk.github.io/agentic-air-frying/setup.html#fingerbot) is a fit and touch experiment. Follow COSORI’s manual Start procedure for cooking with this model.

[Public grocery examples](https://ethansk.github.io/agentic-air-frying/setup.html#common-orders) are inspiration for choosing a meal. They do not describe the current user's orders or supply a cooking preset.
