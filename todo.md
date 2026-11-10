## Explicit TODO comments: 8

1. Persist/read cart state cleanly — `CartContext.jsx`
2. Add asset attribution — `Store.jsx`
3. Complete scroller/company-name section — `Hero.jsx`
4. Extract reusable input/textarea components — `ContactForm.jsx`
5. Test Button inline-style precedence — `Button.jsx`
6. Wire product-card Add to Cart — `ProductCard.jsx`

## Missing functional todos that should be added

### High priority

1. **Build the New Arrivals page**
   - Currently only renders `NewArrivalsPage`.
   - File: `NewArrivalsPage.jsx`

2. **Build the Shirts page**
   - Currently only renders `ShirtsPage`.
   - File: `ShirtsPage.jsx`

3. **Fix broken navigation routes**
   - `/shop` is linked but has no route.
   - `/new-arrival` is used by the mobile menu, but the route is `/new-arrivals`.
   - Files: `NavPanel.jsx`, `router.jsx`

4. **Implement search**
   - Search input accepts text but does not filter, display results, or navigate.
   - File: `SearchMenu.jsx`

5. **Implement product-card Add to Cart**
   - Button currently has no click handler.
   - File: `ProductCard.jsx`

6. **Implement cart quantity controls**
   - Plus and Minus icons are non-functional.
   - File: `CartPanel.jsx`

7. **Implement item removal**
   - No remove-item action exists.

8. **Implement clear cart**
   - No clear-cart action exists.

9. **Update cart totals when quantities change**
   - Required together with quantity and removal functionality.

### Medium priority

10. **Implement favorites**
    - “Open Favorites” has no behavior.
    - Product cards have no favorite action.
    - File: `FavoritesMenu.jsx`

11. **Implement account actions**
    - Edit Profile, Login, and Signup are currently non-functional.
    - File: `UserMenu.jsx`

12. **Implement contact form submission**
    - `submitContact()` is empty.
    - File: `ContactForm.jsx`

13. **Replace placeholder contact/social links**
    - The email uses `collorbone.example`.
    - Social links currently point to `/`.
    - Files: `ContactForm.jsx`, `Sidebar.jsx`

14. **Add accessibility labels to icon-only controls**
    - Search panel icon button produced missing-label console errors.
    - File: `SearchMenu.jsx`

## Summary

- **6 explicit TODO comments**
- **14 functional/design todos currently missing or unfinished**
- **22 total actionable items**, with some overlap:
  - The product-card Add to Cart item appears both as an explicit TODO and a tested functional failure.
  - Cart quantity, removal, clear-cart, and total recalculation belong to one larger cart-management task.
