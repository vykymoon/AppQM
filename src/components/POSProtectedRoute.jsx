import RoleProtectedRoute from './components/RoleProtectedRoute';
import WelcomePOS from './components/login/WelcomePOS';
// Dentro de tu componente App o donde tengas el router
return (
  <BrowserRouter>
    <Routes>
      <Route path="/welcome-pos" element={
        <RoleProtectedRoute allowedRoles={["POS"]}>
          <WelcomePOS />
        </RoleProtectedRoute>
      } />

      <Route path="/manage-products" element={
        <RoleProtectedRoute allowedRoles={["POS"]}>
          <ProductListManagement />
        </RoleProtectedRoute>
      } />
    </Routes>
  </BrowserRouter>
);
