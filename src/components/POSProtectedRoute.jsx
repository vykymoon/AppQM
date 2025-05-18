import RoleProtectedRoute from './components/RoleProtectedRoute';

// ...

<Route path="/manage-products" element={
  <RoleProtectedRoute allowedRoles={["POS"]}>
    <ProductListManagement />
  </RoleProtectedRoute>
} />
