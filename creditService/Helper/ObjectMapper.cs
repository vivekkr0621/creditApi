public static class ObjectMapper
{
    public static TTarget Map<TSource, TTarget>(TSource source)
        where TTarget : new()
    {
        var target = new TTarget();
        foreach (var prop in typeof(TSource).GetProperties())
        {
            var targetProp = typeof(TTarget).GetProperty(prop.Name);
            if (targetProp != null && targetProp.CanWrite)
            {
                targetProp.SetValue(target, prop.GetValue(source));
            }
        }
        return target;
    }
}
