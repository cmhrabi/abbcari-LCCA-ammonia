def Class LCCA():
    X_b = 0.01486512
    X_sat = 240.64
    t_o = 2027
    t_f = 2050

    def X_n_calc():
        n = self.t_f - self.t_o + 1

        r = (1 / (t_f - t_o)) * math.log(((0.99 * X_sat) - X_b) / (0.01 * X_b))

        X_n_cumulative = []
        X_n = []
        for i in range(n):
            x = X_sat / (1 + ((X_sat - X_b) / X_b) * math.exp(-r * (i)))

            X_n.append(x)

            if i != 0:
                X_n_cumulative.append(x + X_n_cumulative[i - 1])
            else:
                X_n_cumulative.append(x)
        return X_n, X_n_cumulative

